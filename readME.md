### NODE MON ??
소스를 변경할때 그걸 감지해서 자동으로 서버를 재시작해주는 tool
```
npm install nodemon --save-dev
```

### 비밀 정보를 암호화해서 github에 올리기
Local 환경일 때는 dev.js에서 정보를 가져오지만,  
deploy된 환경에서는 해당 배포 도구에 변수 설정을 해 줘야 한다.

### Bcrypt로 비밀번호를 암호화 하기
```
npm install bcrypt --save
```
암호화가 필요한 파트인 user.js에서 
변수 userSchema.pre 를 사용해 save 이전에 동작을 넣는다.

### 로그인 기능
1. 요청된 이메일이 DB에 있는지 찾기
2. 요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인.
3. 비밀번호까지 맞으면 Token 생성

콜백에서 err가 아님을 나타내기는 null

토큰생성을 위해 jsonwebtoken을 npm install