const mongoose = require('mongoose')

const User = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    }
})

mongoose.model("User", User)