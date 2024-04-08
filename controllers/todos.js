const Todo = require('../models/Todo')
const User = require('../models/User')
const Wod = require('../models/Wod')
const moment = require('moment')



module.exports = {
    getTodos: async (req, res) => {
        try {
            const today = moment.utc().startOf('day');
            console.log(today);
            const wods = await Wod.find({
                date: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').toDate()
                },
                userId: req.user.id  // Assuming you want to filter by the logged-in user's ID.
            });
            console.log(wods);

            // Initialize exercises as an empty array to handle the case where no documents are found.
            let exercises = [];
            if (wods.length > 0) {
                exercises = wods[0].exercises;
            }
            console.log(exercises);

            const todoItems = await Todo.find({ userId: req.user.id });
            const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false });
            const todayScore = req.user.dailyScore;
            const cummulativePoints = req.user.userScore;

            res.render('todos.ejs', {
                todos: todoItems,
                left: itemsLeft,
                user: req.user,
                dailyScore: todayScore,
                totalScore: cummulativePoints,
                wod: exercises
            });
        } catch (err) {
            console.log(err);
            res.status(500).send("Error getting todos");
        }
    },

    // WOD Functionality
    markWodComplete: async (req, res)=>{
        try{
            await User.findOneAndUpdate({_id: req.user._id},{  
                
                $inc : { userScore: 10, dailyScore: 10}//Updates both daily and total scores
            })
            console.log('Added total score')
            res.json('Added total score')
        }catch(err){
            console.log(err)
        }
    },
    
    //Add-on exercises Functionality
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
            });
            console.log('Marked Complete');
    
            await User.findOneAndUpdate({_id: req.user._id},{  
                $inc : {userScore : 10}
            });
            console.log('Added total score');
    
            // Combine both messages into a single response
            res.json({
                message: 'Marked Complete and Added total score'
            });
        } catch(err){
            console.log(err);
            // It's good practice to send error status and message in case of failure
            res.status(500).json({error: 'An error occurred'});
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
    },
} 



// Example function to seed today's WOD if it doesn't exist for the user
async function seedTodaysWodForUser(userId) {
    const today = moment.utc().startOf('day');
    const existingWod = await Wod.findOne({
        userId: userId,
        date: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }
    });

    if (!existingWod) {
        const newWod = new Wod({
            userId: userId,
            date: new Date(),
            exercises: [
                { exercise: "50 Jumping Jacks", completed: false, wodPoints: 5 },
                { exercise: "30 Second Handstand", completed: false, wodPoints: 10 },
                { exercise: "20 Farmer's Carry", completed: false, wodPoints: 10 },
                { exercise: "10", completed: false, wodPoints: 10 },
            ]
        });

        await newWod.save();
        console.log("Seeded today's WOD for user:", userId);
    }
}

// Example usage
// seedTodaysWodForUser(req.user.id);
    
    // markWodIncomplete: async (req, res)=>{
    //     try{
    //         await Wod.findByIdAndUpdate('6314e27c7a21a03ced034cfe', {_id: req.body.todoIdFromJSFile},{
    //             completed: false,
    //         })
    //         console.log('Marked Wod Incomplete')
    //         res.json('Marked Wod Incomplete')
    //         await User.findOneAndUpdate({_id: req.user._id},{ //total score
    //              $inc : {userScore : -10, dailyScore: -10}
    //          })
    //         console.log('Updated Total Score')
    //         res.json('Updated Total Score')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
 


 /*


  //First Attempt hardcoded ID:
        // const wod = await Wod.findById('6314e27c7a21a03ced034cfe'); This one displays it
        // const exercises = wod.exercises
        // console.log(exercises)
           
        
        
        PseudoCode Database




            async function checkforWod ()
            if user has today's wod move on
            else run create wod
            
            //create wod
            go to wods db and find the one from today

             const wodToday = await Wod.find({ date: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }})

             //insertusername
             wodToday[0].userName = req.user.id



            //createOne

            async function (req, res)=>{
        try{
            await Wod.create(wodToday)
            console.log('Wod has been created')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }

            

           



            */