const { array } = require('joi');
const mongoose =  require('mongoose');

const userSchema = mongoose.Schema({
    personal : {
        type: {
            name : {
                type : String,
                required : true
            },
            email : {
                type : String,
                required : true,
                unique: true
            },
            required: true,
        }
    },
    password: {
                type: String,
                required : true
    },
    // post object for users
    post : {
        type:{
            title :{
                type: String,
                required : true
            },
            date : {
                type : String,
            },
            comment:{
                type: Array,
                default: []
                }
            }
        }
});

module.exports = mongoose.model('User', userSchema, '_users');
