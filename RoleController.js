const Roles = require('../models/Roles')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const register = async (req,res,next)=> {
//     bcrypt.hash(req.body.password, 10, (err,hashedPass)=>{
//         if(err) {
//             res.json({
//                 error:err
//             })
//         }

//         let roles = new Roles({

//             name: req.body.name,
//             email: req.body.email,
//             phone : req.body.phone,
//             password: hashedPass,
//             role : req.body.role
//         })

//         let createRoles = await roles.save()
//         console.log(createRoles)
//         try {
//             let regToken = jwt.sign({id:roles.id},'secretCode',{expiresIn:'1hr'})
//             let reg_id = roles._id
//             let regRole = roles.role

//             res.status(200).json({
//                 Response: 'Roles Added Successfully!',
//                 regToken,
//                 reg_id,
//                 regRole
//             })
//         }
//         catch(err){
//             console.log(err)
//         } 
//     })
// }


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new Roles ({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
            role : req.body.role


        })

        user.save()
            .then(user => {
                let regToken = jwt.sign({id:user.id,role:user.role}, 'SecretValue', { expiresIn: '1hr' })
                let reg_id = user._id

                res.json({
                    message: 'User Added Successfully!',
                    regToken,
                    reg_id

                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    })

}


const login = (req, res, next) => {
    try{
    var username = req.body.username
    var password = req.body.password

    Roles.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            console.log("user", user)
            if (user) {
                if (!user.password) {
                    return res.status(400).json({
                        status: 400,
                        message: "Password not found"
                    })
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ id: user.id,role:user.role }, 'SecretValue', { expiresIn: '1hr' })
                        let log_id = user._id

                        return res.json({
                            message: 'Login Successful!',
                            token,
                            log_id
                        })
                    } else {
                        return res.json({
                            message: 'Password does not match'
                        })
                    }
                })
            } else {
                return res.json({
                    message: 'No user found!'
                })
            }
        })
    } catch(err) {
        console.log(err)
    }
}

const find = async (req,res,next)=>{
    let findUser = await Roles.findById(req.params.id)
     console.log(findUser)
    res.status(200).json({
        response: findUser
    })
}



module.exports = {
    register, login, find
}