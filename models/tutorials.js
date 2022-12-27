const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/userDB")
const tutorialSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
})
const tutorialModel = mongoose.model('tutorials',tutorialSchema)
module.exports = tutorialModel