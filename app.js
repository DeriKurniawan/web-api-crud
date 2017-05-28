const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportHelper = require('./helpers/passport')

mongoose.Promise = require('bluebird')


var users = require('./routes/users')
var memos = require('./routes/memos')

passport.use(new LocalStrategy(passportHelper))
const app = express()
app.use(passport.initialize());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use('/api/users', users)
app.use('/api/memos', memos)

app.listen(3000, ()=>{
	console.log("You access port 3000")
})

module.exports = app
