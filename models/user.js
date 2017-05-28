const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('../config/db')

var userSchema = new Schema({
	name : {type : String, required : true},
	email : {type : String, match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email'], required : true},
	username : {type : String, required : true},
	password : {type : String, required : true},
	role : {type : String, required : true}
},{timestamps : true})

var User = mongoose.model('User', userSchema)
module.exports = User
