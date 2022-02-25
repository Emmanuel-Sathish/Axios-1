const Coupon = require('../models/Coupon')
const axios = require('axios')
const res = require('express/lib/response')

// To create a coupon
const createCoupon = async (req,res,next)=> {
    //console.log(req.user.id)

    let create = new Coupon ({

        offerName         : req.body.offerName,
        couponCode        : req.body.couponCode,
        startDate         : req.body.startDate,
        endDate           : req.body.endDate,
        discountPercentage: req.body.discountPercentage,
        discountAmount    : req.body.discountAmount,
        termsAndConditions: req.body.termsAndConditions,
        markAsActive      : req.body.markAsActive,
        offerPoster       : req.body.offerPoster,
        createdTo         : req.body.createdTo,
    })

    let creatingCoupon = await create.save()
    console.log(creatingCoupon)
    res.status(200).json({
        data:creatingCoupon
    })
        
}

// For updating the coupon

const updateCoupon = async (req,res,next) => {
    let {offerName, couponCode, startDate, endDate, discountPercentage, discountAmount, termsAndConditions, markAsActive, offerPoster, _id} = req.body;
    let objId= _id
    console.log("Checking if we are getting _id", objId)
    let updatedCoupon = {

    }
    if (offerName) {
        updatedCoupon.offerName = offerName
    }
    if (couponCode) {
        updatedCoupon.couponCode = couponCode
    }
    if (startDate) {
        updatedCoupon.startDate = startDate
    }
    if (endDate) {
        updatedCoupon.endDate = endDate
    }
    if (discountPercentage) {
        updatedCoupon.discountPercentage = discountPercentage
    }
    if (discountAmount) {
        updatedCoupon.discountAmount = discountAmount
    }
    if (termsAndConditions) {
        updatedCoupon.termsAndConditions = termsAndConditions
    }
    if (markAsActive) {
        updatedCoupon.markAsActive = markAsActive
    }
    if (offerPoster) {
        updatedCoupon.offerPoster = offerPoster
    }

    let updatingCoupon = await Coupon.findByIdAndUpdate(objId, updatedCoupon)
    //console.log(updatingCoupon)
    let changedCoupon = await Coupon.findById(objId)
    console.log(changedCoupon)
    res.status(200).json({
        data:changedCoupon
    })

    

}

// To find a coupon by id
    const findCoupon = async (req,res,next)=> {
    let show = await Coupon.findById( req.params.id)
    res.status(200).json({
        response:show
    })
}


//To search by Coupon Name
const offName = async (req,res,next)=> {
    let name = await Coupon.find({offerName: {$regex: "Second offer",$options: "$i"}})
    console.log(name)
    res.status(200).json({
        response: name
    })
}

// To search by coupon Code
const coupCode = async (req,res,next)=> {
    let num = await Coupon.find({couponCode: {$regex: "2001"}})
    console.log(num)
    res.status(200).json({
        response: num

    })
}

// To filter by status
const coupStatus = async(req,res,next)=> {
    let status  =await Coupon.find({markAsActive:req.params.markAsActive})
    console.log(status)
    res.status(400).json({
        response: status
    })
}

// To sort by createdAt time

const coupSort = async (req,res,next)=> {
    let sortCoup = await Coupon.find().sort({"createdAt":-1})
    console.log(sortCoup)
    res.status(200).json ({
        response: sortCoup
    })
}

//To show user's coupon
const showCoupon = async (req,res,next)=> {
    let showCoupon = await Coupon.find({createdTo:req.body.id})
    console.log(showCoupon)
    res.status(200).json({
        response : showCoupon
    })
}

//Axious call
const getCreatedToUserById = async(req,res)=>{
    let getId = await axios({

        method: "GET",
        url: "http://localhost:3002/api/find/6209041de912231c4eae33ad",
        headers: {
        contentType: "application/json",
        }
    })
    console.log(getId)
    
    res.status(200).json({
        response: getId.data
    })
  
}
    



module.exports = {
    createCoupon, updateCoupon, findCoupon, offName, coupCode, coupStatus, coupSort, showCoupon, getCreatedToUserById
}