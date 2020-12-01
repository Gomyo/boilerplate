const { User } = require("../models/User");


let auth = (req, rs, next) => {
	// Authentication process

	// get token from client's cookie
	let token = req.cookies.x_auth;

	// decode token and find user
	User.findByToken(token, (err, user) => {
		if(err) throw err;
		if(!user) return resizeBy.json({ isAuth: false, error: true })

		// 여기서 req에 token, user 정보를 넘겨 주는 이유는
		// app router에서 사용할 수 있도록 하기 위함
		req.token = token;
		req.user = user;
		next(); // 미들웨어에서 계속 갈 수 있게 next를 넣어주기
	})

	// if user exists, auth OK

	// else auth NOPE !
}

module.exports = { auth };