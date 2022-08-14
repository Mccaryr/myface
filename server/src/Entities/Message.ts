import mongoose, { Mongoose } from 'mongoose'
import { ObjectID } from 'typeorm'

const MessageSchema = new mongoose.Schema({
    conversation_id: {type: String, required: true}, 
    content: {type: String, required: true},
    receiver_id: {type: String, required: true},
    sender_id: {type: String, required: true},
    profile_url: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    date_string: {type: String},
    createdAt: {type: Date, default: Date.now, required: true} 
})

export const Message = mongoose.model('Message', MessageSchema)