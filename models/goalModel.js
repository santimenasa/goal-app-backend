
const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user:{//esto nos va a permtir tener un usuario asociado a un goal
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
    text:{
        type:String,
        minlength:2,
        maxLength:200,
        required:[true, 'please add a text value']
        
    }

},{timestamps:true,})

module.exports = mongoose.model('Goal',goalSchema)