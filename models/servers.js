const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/userDB")
const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    ip:{
        type: String,
        trim: true,
        required: true,

    },
    file_Id:{

        type:String,
        required: true

    },
    service_Id:{

        type:String,
        require: false

    }
})
const serverModel = mongoose.model('servers',serverSchema)
module.exports = serverModel