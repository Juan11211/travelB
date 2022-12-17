const express = require('express')
const commentRouter = express()
const Comment = require('../models/Comment')

// get comments
commentRouter.get('/:travelId', (req, res, next) => {
    Comment.find(
        {travelId: req.params.travelId},
        (err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            res.status(200).send(comments)
        }
    )
})
// post comment 
commentRouter.post('/', (req, res, next) => {
    req.body.userId = req.auth._id
    req.body.username = req.auth.username
    const newComment = new Comment(req.body)
    newComment.save(
        (err, comment) => { 
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(comment)
        }
    )
})

//delete comment 
commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId, userId: req.auth._id}, 
        (err, deletedTravel) => { 
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted comment`)
        }
    )
})

module.exports = commentRouter