const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/userDB")
const faqSchema = new mongoose.Schema({
    key: {
        type: String,
        trim: true,
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: true
    }
})
const faqModel = mongoose.model('faqs',faqSchema)
module.exports = faqModel