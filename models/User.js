const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 10
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})
// 유저정보를 저장하기 전에(pre)
userSchema.pre('save', function(next){
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) return next(err);

          bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
          });
        });
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPW, cb) {
    // plainPassword : 1256434, hash : $2b$10$wwSaeo97LQidhhom/h.jyOLJkhkq4x2d3vAZWKlqOmbBlJGlevfVq
    bcrypt.compare(plainPW, this.password, function(err, isMatch) {
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user._id',user._id)
    // jsonwebtoken을 이용해 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err)
        cb(null, user)
    })


}

// schema를 모델로 감싸 줌
const User = mongoose.model("User", userSchema)

// 이 모델을 다른 파일에서도 쓰기 위해
module.exports = { User }