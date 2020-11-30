const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://joonwon:abcd1234@boilerplate.qabqn.mongodb.net/Boilerplate?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))
app.get('/', (req, res) => {
    res.send('Hello World! 하이영 ㅎㅎㅎ 드디어 npm run start 성공')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})