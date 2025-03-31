const bcrypt = require("bcryptjs");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const employeeSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email: {
        type: String,
        unique: true  // ✅ Correct placement
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
         token: {
            type: String,
        required: true
         }
    }]
})
// generating tokenns

employeeSchema.methods.generateAuthtoken = async function() {
    try {
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRETKEY)
        this.tokens = this.tokens.concat({token: token})
        // await this.save();
        return token 
    } catch (error) {
        console.log(`this is the error${error}`)
    }
   
}

// converting passowrd into hashed passowrd
employeeSchema.pre("save" , async function(next){
    
    this.password = await bcrypt.hash(this.password , 10);
    next()
})

const Register = new mongoose.model("Register", employeeSchema)

module.exports = Register;