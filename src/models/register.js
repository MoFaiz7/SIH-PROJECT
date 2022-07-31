const mongoose = require("mongoose");

// defining mongoose.Schema

const travellerSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    middlename:{
        type:String
        // required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{   // isme thoda dikkat hai
        type:String,
        required:true,
        // unique:true
    },
    DLNumber:{
        type:String,
        required:true,
        unique:true
    },
    issueDate:{
        type:String,
        required:true
    },
    validity:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

// create Collection

const Register = new mongoose.model("Register", travellerSchema);

module.exports = Register;