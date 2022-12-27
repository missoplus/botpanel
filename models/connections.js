const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/userDB")
const connectionSchema = new mongoose.Schema({
    key:{
        type:String,
        trim:true,
        required:true
    },
    file_Id:{

        type:String,

        required: true

    },
})
const connectionModel = mongoose.model('connections',connectionSchema)
module.exports = connectionModel