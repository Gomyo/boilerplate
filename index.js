// espress 모듈을 가져옴
const express = require("express");
// express function 으로 새로운 app을 만듬
const app = express();
// port 설정은 자유
const port = 5000;

const mongoose = require("mongoose")
mongoose.connect(
  "mongodb+srv://joonwon:abcd1234@boilerplate.qabqn.mongodb.net/<dbname>?retryWrites=true&w=majority",{
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected...")).catch(err => console.log(err));

// root 디렉토리 ("/")에 오면 Hello world를 출력하라
app.get("/", (req, res) => res.send("Hello World!??왜 이렇게 해야 열림? npm run start가 안되넹ㅋㅋ"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);