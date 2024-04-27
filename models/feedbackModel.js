const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    user : {type: mongoose.Schema.Types.ObjectId, refrences : 'User' , required:false},
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: false },
    message:{ type: String, required: true },
})

module.exports = new mongoose.model('Feedback',FeedbackSchema)
