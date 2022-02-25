const express = require('express')
const router = express.Router()


const CoupController = require('../controllers/CouponController')
const authenticate = require('../middlewares/authenticate')



router.post('/create',authenticate, CoupController.createCoupon)
router.put('/update', authenticate, CoupController.updateCoupon)
router.get('/find/:id',   authenticate, CoupController.findCoupon)
router.get('/offName', authenticate, CoupController.offName)
router.get('/status/:markAsActive', authenticate, CoupController.coupStatus)
router.get('/sort', authenticate, CoupController.coupSort)
//router.get('/false', authenticate, CoupController.coupFalse)
//router.get('/true', authenticate, CoupController.coupTrue)




module.exports= router