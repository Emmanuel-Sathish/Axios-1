const express = require('express')
const router = express.Router()
let validator = require('express-joi-validation').createValidator({
    passError:false
})

const RoleController = require('../controllers/RoleController')
const {registerSupport,loginSupport} = require('../middlewares/joiValidator')

router.post('/register',validator.body(registerSupport),RoleController.register)
router.post('/login',validator.body(loginSupport),RoleController.login)
router.get('/find/:id',RoleController.find)



module.exports = router