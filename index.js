// 변수 선언은 글 맨 위로 올려놓을 것

// espress 모듈을 가져옴
const express = require('express');
// express function 으로 새로운 app을 만듬
const app = express();
// port 설정은 자유
const port = 5000;

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { User } = require("./models/User");

// bodyparser가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 하기
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(
  config.mongoURI,{
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected...")).catch(err => console.log(err));

// root 디렉토리 ("/")에 오면 Hello world를 출력하라
app.get("/", (req, res) => res.send("Hello World! nodemon으로 실행!!"));

// 회원 가입을 위한 라우터 만들기 router
app.post('/register', (req, res) => {
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어준다.
    const user  = new User(req.body)
    user.save((err,userInfo) => {
        if(err) return res.json({ success:false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login', (req,res) => {
    // 요청된 이메일을 데이터베이스에 있는지 찾기
    User.findOne({email : req.body.email}, (err, user) => {
        if(!user) {
            return res.json({loginSuccess : false,message : "이메일이 잘못됨ㅋㅋ루삥뽕~"})
        }
    // 요청된 이메일이 DB에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => { 
        if(!isMatch) 
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        })
    
    // generate Token
    user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        // Token을 저장한다. 어디에? 쿠키에.
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
        })
    })
    
    })
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
// 2020.08.07 이후...