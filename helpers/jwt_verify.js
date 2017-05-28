const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
	verifyTokenAdmin : (req, res, next)=>{
		jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
      if(decoded == undefined){
        res.send(err)
      }else{
        if(decoded.role.toLowerCase() == 'admin') {
          req.decoded = decoded
          next();
        }
        else {
          res.send("You Cant acces this routes")
        }
       }
    })
	},
	verifyTokenAdminAndUser : (req, res, next)=>{
		jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
      if(decoded == undefined){
        res.send(err)
      }else{
        if(decoded.role.toLowerCase() == 'admin' || decoded.role.toLowerCase() == 'user') {
          req.decoded = decoded
          next();
        }
        else {
          res.send(err)
        }
      }
    })
	}
}
