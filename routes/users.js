const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/user')
const passport = require('passport')
const helperJwt = require('../helpers/jwtVerify')

router.post('/signin', passport.authenticate('local', {session : false}), controllerUser.signin)
router.post('/signup', controllerUser.signup)

router.get('/',  helperJwt.verifyTokenAdmin, controllerUser.getAll)
router.get('/:id', helperJwt.verifyTokenAdminAndUser, controllerUser.getDetail)
router.post('/', helperJwt.verifyTokenAdmin, controllerUser.insert)
router.delete('/:id',  helperJwt.verifyTokenAdmin, controllerUser.delete)
router.put('/:id', helperJwt.verifyTokenAdminAndUser, controllerUser.update)




module.exports = router
