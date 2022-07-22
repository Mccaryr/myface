import mongoose from 'mongoose'

 const UserSchema = new mongoose.Schema({ 
    user_id: {type: String, required: true},
    friends: {type: Array, required: false},
    profile_url: {type: String, required: false},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    job: {type: String, required: false},
    education: {type: String, required: false},
}, {timestamps: true})

export const User = mongoose.model('User', UserSchema)


