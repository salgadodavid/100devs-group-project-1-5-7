const mongoose = require('mongoose')


const WodSchema = new mongoose.Schema({ 
    userId:String,  //
    _id: mongoose.ObjectId,
    date: Date,
    exercises:[{exercise: String, completed: Boolean, _id: mongoose.ObjectId, wodPoints: Number}, 
               {exercise: String, completed: Boolean, _id: mongoose.ObjectId, wodPoints: Number}, 
               {exercise: String, completed: Boolean, _id: mongoose.ObjectId, wodPoints: Number}
              ]
})

module.exports = mongoose.model('Wod', WodSchema)


