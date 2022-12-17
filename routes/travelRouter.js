const express = require("express")
const travelRouter = express.Router()
const Travel = require('../models/Travel.js')

// Get All travel
travelRouter.get("/", (req, res, next) => {
  Travel.find((err, travel) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(travel)
  })
})

// Get travel by user 
travelRouter.get("/user", (req, res, next) => {
  Travel.find({ user: req.auth._id }, (err, travel) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(travel)
  })
})

// Get travel by user ID
travelRouter.get("/user/:userId", (req, res, next) => {
  Travel.find({ user: req.params.userId }, (err, travel) => {
      if (err) {
          res.status(500)
          return next(err)
      }
      return res.status(200).send(travel)
  })
})

// Add new Todo
travelRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id
  const newTravel = new Travel(req.body)
  newTravel.save((err, savedTravel) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedTravel)
  })
})

// Delete Todo
travelRouter.delete("/:travelId", (req, res, next) => {
  Travel.findOneAndDelete(
    { _id: req.params.travelId, user: req.auth._id },
    (err, deletedTravel) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete travel: ${deletedTravel.title}`)
    }
  )
})

// Update Todo
travelRouter.put("/:travelId", (req, res, next) => {
  Travel.findOneAndUpdate(
    { _id: req.params.travelId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedTravel) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedTravel)
    }
  )
})

// likes route 
travelRouter.put('/likes/:travelId', (req, res, next) => { 
  Travel.findOneAndUpdate(
    {_id: req.params.travelId}, 
    {$inc: { likes: 1}}, 
    {new: true}, 
    (err, travel) => { 
      if(err){
        res.status(500)
        return next(err)
      }
      if(!travel.likers.includes(req.auth._id)) {
        Travel.findOneAndUpdate(
          {_id: req.params.travelId},
          {$push: {likers: req.auth._id}},
          {new: true},
          (err, travel) => { 
            if(err){
              res.status(500)
              return next(err)
            }
            return res.status(200).send(travel)
         })
      } else {
        res.status(500)
        Travel.findOneAndUpdate(
          {_id: req.params.travelId},
          {$inc: {likes: -1}},
          {new: true}, 
          (err, travel) => {
            if(err){
              res.status(500)
              return next(err)
            }
            return next(new Error('You already liked this post'))
          })
      }})
})



module.exports =  travelRouter