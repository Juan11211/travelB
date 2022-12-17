const mongoose = require('mongoose')
const Schema = mongoose.Schema

const travelSchema = new Schema({
  location: {
    type: String,
    required: true
  },
  review: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  imgUrl: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, 
  createdAt: {
    type: Date,
    default: Date.now()
  },
  likes: {
    type: Number,
    default: 0
  }, 
  likers: { 
    type: Array
  }, 
})

module.exports = mongoose.model("Travel", travelSchema)