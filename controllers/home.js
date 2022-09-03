module.exports = {
    getIndex: (req,res)=>{
        res.render('index.ejs')
    }
}
//leon's original code above

//bringing in User
// const User = require('../models/User')

// module.exports = {
//     getIndex: (req,res)=>{
//         //console.log(req.user)
//         res.render('index.ejs')
//     }
// }

// getTodos: async (req,res)=>{
//     console.log(req.user)
//     try{
//         const todoItems = await Todo.find({userId:req.user.id}) 
//         const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
//         const points = todoItems.map(obj => obj.exercisePoints) 
//         const score = points.reduce((a,c) => a + c, 0 )
//         //total Score
//         const cummulativePoints = req.user.userScore
//         res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user, dailyScore: score, totalScore: cummulativePoints})  
//     }catch(err){
//         console.log(err)
//     }
// },