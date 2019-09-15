/*
connect mongoDB
*/
const mongoose = require('mongoose')
const connectDatabase = async() => {
    try{
        let uri = 'mongodb://:@127.0.0.1:27017/mongooseDatabase'
        let options = {
            connectTimeoutMS: 10000,// 10 giây
			useNewUrlParser: true,
			useCreateIndex: true,
        }
        await mongoose.connect(uri,options)
        console.log('Connect Mongo Database successfully')
    }catch{
        console.log(`Cannot Connect Mongo Database. :${error}`)
    }
}
connectDatabase()

module.exports = {mongoose}