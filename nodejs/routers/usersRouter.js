/**
 * router for user
 */
const express = require('express')
const router = express.Router()
const {insertUser,
        loginUser,
        verifyJWT} = require('../database/models/User')

router.use((req, res, next)=>{
    console.log('Time: ',Date.now())
    next()
})
router.post('/registerUser', async(req, res)=>{
    let {name, email, password} = req.body
    try{
        await insertUser(name, email,password)
        res.json({
            result:'oke',
            message:'Success'
        })
    }catch(error){
        res.json({
            result:'failed',
            message:`${error}`
        })
    }
})
// api login
router.post('/login', async(req, res)=>{
    let {email, password}= req.body
    try{
        let tokenKey = await loginUser(email,password)
        res.json({
            result:'oke',
            message:'Login success',
            tokenKey
        })
        
    }catch(error){
        res.json({
            result:'failed',
            message:`Login failed : ${error}`
        })
    }
})
//api get info user
router.get('/info', async (req, res) => {		
    let tokenKey = req.headers['authorization'];
    if (tokenKey.startsWith('Bearer ')) {
        tokenKey = tokenKey.slice(7, tokenKey.length);
        try {
            //Verify token
            let info = await verifyJWT(tokenKey)
            res.json({
                result: 'ok',
                message: 'Verify Json Web Token success',
                infoUser: {
                    id: info._id,
                    name: info.name,
                    email: info.email
                }	  		
              })	
        } catch(error) {
            res.json({
                result: 'failed',
                message: `Verify token failed: ${error}`
            })
        }
      }
      else{
        res.json({
            result:'failed',
            message:'Auth token is not supplied'
        })
      }
    
})

module.exports =router