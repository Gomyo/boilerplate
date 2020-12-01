const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
	res.send('Nodemon installed!')
})

app.post('/api/users/register', (req, res) => {
	
	// When client transport information while registering,
	// put them into DB.
	const user = new User(req.body)

	user.save((err, userInfo) => {
		if (err) return res.json({success: false, err})
		return res.status(200).json({
			success: true
		})
	})
})

app.post('/api/users/login', (req, res) => {
	// Find requested email in DB
	User.findOne({ email: req.body.email }, (err, user) => {

		if (!user) {
			return res.json({
				loginSuccess: false,
				message: "제공된 이메일에 해당하는 유저가 없습니다."
			})
		}
		// if it exists, check password is valid or not.
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({ loginSuccess: false, message: "Wrong Password" })

			// if valid password, create TOKEN
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);

				// 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
				res.cookie("x_auth", user.token)
				.status(200)
				.json({ loginSuccess: true, userId: user._id })
			})
		})
	})
})

// auth라는 미들웨어를 추가. 콜백 펑션을 받은 다음에 중간에서 처리를 해줌.
app.get('/api/users/auth', auth, (req, res) => {
	// 여기까지 미들웨어를 통과해 왔다면 authentication이 성공적으로 완료되었다는 것
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image
	})
})

app.get('/api/users/logout', auth, (req, res) => {
	
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ token: "" }
		, (err, user) => {
			if(err) return res.json({ success: false, err});
			return res.status(200).send({
				success: true
			})
		})
})
	

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})