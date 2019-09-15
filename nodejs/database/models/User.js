/**
 * User model
 */
const {mongoose} = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretString = "tungdt"
const {Schema} = mongoose
const UserSchema = new Schema({
    name: {type: String, default: 'unknown', unique: true},    
    email: {type: String, match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique: true},
    password: {type: String, required: true},    
   
})
const User = mongoose.model('User',UserSchema)
const insertUser = async(name, email, password)=>{
    try{
        const encryptedPassword = await bcrypt.hash(password,10)
        const newUser = new User()
        newUser.name = name
        newUser.email = email
        newUser.password = encryptedPassword        
        await newUser.save()
    }catch(error){
        throw error
    }
}
const loginUser = async(email, password)=>{
    try{
        let foundUser = await User.findOne({email: email.trim()}).exec()
        if(!foundUser){
            throw "User does not exist"
        }
        if(foundUser){
            let encryptedPassword = foundUser.password
            let checkPassword = await bcrypt.compare(password, encryptedPassword)
            if(checkPassword === true){
                //login success
                let jsonObject = {
                    id:foundUser._id
                }
                let tokenKey = await jwt.sign(jsonObject,secretString,{
                                                    expiresIn:3600
                                                })
                return tokenKey
            }else{
                throw "Password does not exist"
            }
        }
        
    }catch(error){
        throw error
    }
}
const verifyJWT = async (tokenKey) => {
    try {          
        let decodedJson = await jwt.verify(tokenKey, secretString)
        if(Date.now() / 1000 >  decodedJson.exp) {
            throw "Token hết hạn, mời bạn login lại"
        }
        let foundUser = await User.findById(decodedJson.id)
        if (!foundUser) {
            throw "Ko tìm thấy user với token này"
        }
        return foundUser
    } catch(error) {
        throw error
    }                 
}
module.exports = {User, insertUser,loginUser,verifyJWT}