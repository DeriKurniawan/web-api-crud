const Memo = require('../models/memo')

module.exports = {
	getAll : (req, res)=>{
		Memo.find({user:req.decoded.id})
		.populate('user')
		.then(result =>{
			res.send(result)
		})
		.catch(err =>{
			res.send(err)
		})
	},
	getDetail : (req, res)=>{
		Memo.findById(req.params.id)
		.populate('user')
		.then(result=>{
			console.log(result)
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	},
	insert : (req, res)=>{
		var insertMemo = new Memo({
			memo : req.body.memo,
			user : req.decoded.id
		})

		insertMemo.save((error, response)=>{
			if(!error){
				res.send(response)
			}else{
				res.send(error)
			}
		})
	},
	delete : (req, res)=>{
		Memo.deleteOne({_id : req.params.id})
		.then((result)=>{
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	},
	update : (req, res)=>{
		Memo.findById(req.params.id)
		.then(result=>{
			Memo.updateOne({
				memo : req.body.memo || result.name,
				user : result.user
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
