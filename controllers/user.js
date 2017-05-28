const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
	signup : (req, res)=>{
		User.findOne({username : req.body.username})
		.then(result=>{
			if(result){
				res.send('this username already exists')
			}else{
				User.findOne({email : req.body.email})
				.then(response=>{
					console.log(response)
					if(response){
						res.send('This email is already registered')
					}else{
						var insertUser = new User({
							name : req.body.name,
							email : req.body.email,
							username : req.body.username,
							password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
							role : req.body.role || 'user'
						})

						insertUser.save((error, response)=>{
							if(!error){
								res.send(response)
							}else{
								res.send(error)
							}
						})
					}
				})
				.catch(error=>{
					res.send(error)
				})
			}
		})
		.catch(err=>{
			res.send(err)
		})
	},
	signin : (req, res)=>{
		var user = req.user
		if(user.hasOwnProperty("message")){
			res.send(user.message)
		} else {
			var token = jwt.sign({
				id : user._id,
				name : user.name,
				email : user.email,
				username : user.username,
				role : user.role
			}, process.env.JWT_SECRET, {expiresIn : '1h'})
			res.send({
				token : token,
				msg : user.msg
			})
		}
	},
	getAll : (req, res)=>{
		User.find({})
		.then(result =>{
			res.send(result)
		})
		.catch(err =>{
			res.send(err)
		})
	},
	getDetail : (req, res)=>{
		User.findById(req.params.id)
		.then(result=>{
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	},
	insert : (req, res)=>{
		User.findOne({username : req.body.username})
		.then(result=>{
			if(result){
				res.send('this username already exists')
			}else{
				User.findOne({email : req.body.email})
				.then(response=>{
					console.log(response)
					if(response){
						res.send('This email is already registered')
					}else{
						var insertUser = new User({
							name : req.body.name,
							email : req.body.email,
							username : req.body.username,
							password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
							role : req.body.role || 'user'
						})

						insertUser.save((error, response)=>{
							if(!error){
								res.send(response)
							}else{
								res.send(error)
							}
						})
					}
				})
				.catch(error=>{
					res.send(error)
				})
			}
		})
		.catch(err=>{
			res.send(err)
		})
	},
	delete : (req, res)=>{
		User.deleteOne({_id : req.params.id})
		.then((result)=>{
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	},
	update : (req, res)=>{
		User.findById(req.params.id)
		.then(result=>{
			User.updateOne({
				name : req.body.name || result.name,
				email : req.body.email || result.email,
				username : req.body.username || result.username,
				password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) || result.password,
				role : req.body.role || result.role
			})
			.then(response=>{
				res.send(response)
			})
			.catch(error=>{
				res.send(error)
			})
		})
		.catch(err=>{
			res.send(err)
		})
	}
}
