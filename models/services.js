const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/userDB")
const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    }
})
const serviceModel = mongoose.model('services',serviceSchema)
module.exports = serviceModel