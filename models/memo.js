const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('../config/db')
var memoSchema = new Schema({
	memo : {type : String, required : true},
	user : {type : Schema.Types.ObjectId, ref : 'User'}
},{timestamps : true})

var Memo = mongoose.model('Memo', memoSchema)
module.exports = Memo
