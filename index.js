// 변수 선언은 글 맨 위로 올려놓을 것

// espress 모듈을 가져옴
const express = require('express');
// express function 으로 새로운 app을 만듬
const app = express();
// port 설정은 자유
const port = 5000;

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require('./config/key')
const { User } = require("./models/User");

// bodyparser가 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게 하기
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));
// application/json
app.use(bodyParser.json());

mongoose.connect(
  "config.mongoURI",{
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected...")).catch(err => console.log(err));

// root 디렉토리 ("/")에 오면 Hello world를 출력하라
app.get("/", (req, res) => res.send("Hello World! nodemon으로 실행."));

// 회원 가입을 위한 라우터 만들기 router
app.post('/register', (req, res) => {
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 DB에 넣어준다.
    const user  = new User(req.body)
    user.save((err,userInfo) => {
        if(err) return res.json({ success:false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);