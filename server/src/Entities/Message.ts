import mongoose, { Mongoose } from 'mongoose'

const MessageSchema = new mongoose.Schema({
    content: {type: String, required: true},
    receiver_id: {type: String, required: true},
    sender_id: {type: String, required: true},
    profile_url: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
}, {timestamps: true})

export const Message = mongoose.model('Message', MessageSchema)