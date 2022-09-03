const Todo = require('../models/Todo')
const User = require('../models/User')
const Wod = require('../public/js/exercises')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id}) 
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const points = todoItems.map(obj => obj.exercisePoints) 
            const score = points.reduce((a,c) => a + c, 0 )
            const excercises = Wod
            console.log(excercises)
            //total Score
            const cummulativePoints = req.user.userScore
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user, dailyScore: score, totalScore: cummulativePoints, wod: excercises})  
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, exercisePoints: 0})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true,
                exercisePoints: 10
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
            await User.findOneAndUpdate({_id: req.user._id},{  //total score
                $inc : {userScore : 10}
            })
            console.log('Added total score')
            res.json('Added total score')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false,
                exercisePoints: 0
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
            await User.findOneAndUpdate({_id: req.user._id},{ //total score
                 $inc : {userScore : -10}
             })
            console.log('Updated Total Score')
            res.json('Updated Total Score')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    