// espress 모듈을 가져옴
const express = require("express");
// express function 으로 새로운 app을 만듬
const app = express();
// port 설정은 자유
const port = 5000;
// root 디렉토리 ("/")에 오면 Hello world를 출력하라
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
