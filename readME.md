# 진행기간
2020.11.30 ~ 

# 구성요소
- mongoDB
cluster : basic
pw : abcd1234

- Coding Convention (적용 실패)
[링크](https://velog.io/@velopert/eslint-and-prettier-in-react)를 보고 적용했다.
협업을 위해서는 필수이니 미리 미리 익숙해지기 위해서 O.O

[StackOverFlow](https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install)
이 게시글을 보고 yarn 에러를 해결했다. 꽤나 오래 걸렸다..

CRA v2가 아니기 때문에 아래의 명령어를 입력해 eslint에 필요한 패키지를 설치했다.
```
npx install-peerdeps --dev eslint-config-airbnb
```
yarn 깔고 eslint 버전 텍스트 수정해보고 했지만 자꾸 에러가 떠서 우선은 실습을 진행하기로 했다.
나중에 싹 다 밀고 깔끔하게 해보는걸로.

# Node Js 시작

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

index.js에서 
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
완료

# react 시작

#### create react app
```
npx create-react-app .
```
.를 붙이는 것에 주의하자.

#### 리액트 설치 과정에 No receipt for 'com.apple.pkg.~~' 에러
```
$ xcode-select --install 만약 안되면
$ sudo rm -rf $(xcode-select -print-path)로 삭제한 뒤 설치한다.

#### react-router-dom install

#### axios install