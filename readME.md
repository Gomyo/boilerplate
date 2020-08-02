### NODE MON ??
소스를 변경할때 그걸 감지해서 자동으로 서버를 재시작해주는 tool
```
npm install nodemon --save-dev
```

### 비밀 정보를 암호화해서 github에 올리기
Local 환경일 때는 dev.js에서 정보를 가져오지만,  
deploy된 환경에서는 해당 배포 도구에 변수 설정을 해 줘야 한다.