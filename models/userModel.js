const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true, 'Please let us know your name']
    },
    email:{
        type:String,
        require:[true, 'Please let us know your email'],
        unique:true
    },
    password:{
        type:String,
        require:[true, 'Please add a password']
    },
  
},{
    timestamps:true//crea createdAt y updatedAt automaticamente
});

module.exports = mongoose.model('User', userSchema)