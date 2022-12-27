const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10;
mongoose.connect("mongodb://localhost:27017/userDB",{

    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log("connection successful")
}).catch((err)=>console.log(err))

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: false
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};
const userModel = mongoose.model('users',userSchema)
module.exports = userModel