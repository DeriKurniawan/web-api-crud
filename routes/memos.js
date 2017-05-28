const express = require('express')
const router = express.Router()
const controllerMemo = require('../controllers/memo')
const helperJwt = require('../helpers/jwtVerify')


router.get('/', helperJwt.verifyTokenAdminAndUser, controllerMemo.getAll)
router.get('/:id', helperJwt.verifyTokenAdminAndUser,controllerMemo.getDetail)
router.post('/', helperJwt.verifyTokenAdminAndUser,controllerMemo.insert)
router.delete('/:id', helperJwt.verifyTokenAdminAndUser,controllerMemo.delete)
router.put('/:id', helperJwt.verifyTokenAdminAndUser, controllerMemo.update)




module.exports = router
