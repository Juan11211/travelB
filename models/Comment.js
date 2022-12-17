const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({

    comment: {
        type: String
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    username: {
        type: Schema.Types.String,
        ref: "User",
        required: true
    },

    travelId: {
        type: Schema.Types.ObjectId,
        ref: "Travel",
        required: true
    }

})

module.exports = mongoose.model("Comment", commentSchema)