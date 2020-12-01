# 진행기간
2020.11.30 ~ 

# 구성요소
- mongoDB
cluster : basic
pw : abcd1234

- Coding Convention
[링크](https://velog.io/@velopert/eslint-and-prettier-in-react)를 보고 적용했다.
협업을 위해서는 필수이니 미리 미리 익숙해지기 위해서 O.O

CRA v2로 구성한 프로젝트가 아니기 때문에 아래의 명령어를 사용해 한번에 설치했다.
```
npx install-peerdeps --dev eslint-config-airbnb
```
#### Node JS Install
$ apt install nodejs doesn't work, so I entered the code below...
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Optional하게 아래의 명령어를 입력했다.
```
sudo apt-get install -y build-essential
```

#### express JS Install
```
npm install express --save
```

- error code ELIFECYCLE 이슈 해결
https://stackoverflow.com/questions/42308879/how-to-solve-npm-error-npm-err-code-elifecycle

#### mongoose Install
```
npm install mongoose --save
```

#### body-parser install
```
npm install body-parser --save
```

#### nodemon
```
npm install nodemon --save-dev
```
dev 옵션을 추가하여 로컬에서만 적용이 되도록 함 (로컬 테스트에서는 자동으로 적용되어도, 배포 버전에서는 되지 않도록 하기 위함이라고 생각됨)

#### 소스 보안화
dev.js에 있는 정보들을 export해서 사용하고, ignore한다.
다만 이 파일은 실습을 위한 것이므로 그냥 올린다.

#### 정보 암호화 (Bycrypt)
```
npm install bcrypt --save
```
이 단계에서 에러가 났었다. 예전에 만들어둔 클러스터로 진행을 하려니 11000 mongoDB error가 뜬 것...
클러스터를 새로 파니까 해결되었다.

#### json web token 생성
```
npm install jsonwebtoken --save
```

#### cookie-parser 설치
```
npm install cookie-parser --save
```

#### login 기능 구현 에러
```
userSchema.methods.comparePassword = function(plainPassword, cb) {
    
    // plainPassword 1234567 DB : $2b$10$RE8oTRI/Jgi1NCIaJfIFBOYSV0N.JG3oM.vqjYo0T2/2UoG79HR3m
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}
```
위 부분에서 if 부분에 return cb(err) 뒤에 ,를 붙이라고 설명이 되어 있어서 
ES5는 3항 연산자 return 문 처리가 가능한가? 흠 파이썬같네 하고 넘겼는데 저 부분이 문제였다.
세미콜론으로 해야 정상적으로 동작함.

#### Auth 기능 만들기