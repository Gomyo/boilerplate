#### Node JS Install
리눅스에서 사용하려고 하니 단순한 apt install nodejs는 먹지 않아서 
아래의 명령어를 입력했다.
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
