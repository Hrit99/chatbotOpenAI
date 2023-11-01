//model defined for the chats
const mongoose = require("mongoose")  
const schema = mongoose.Schema 
const chatSchema = new schema({
    sender: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{timestamps:true, collection: 'chats'})

const chat = mongoose.model('chats', chatSchema);

module.exports = chat