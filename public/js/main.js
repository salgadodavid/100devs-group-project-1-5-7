//WOD
const wodItem= document.querySelectorAll('span.wod.not')
const wodComplete = document.querySelectorAll('span.wod.completed') //Functionality Not working
//Add-on Exercises
const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.add-on.not')
const todoComplete = document.querySelectorAll('span.add-on.completed')

//WOD Event Listeners

Array.from(wodItem).forEach((el)=>{
    el.addEventListener('click', markWodComplete)
})


// Event Listeners for Add-on exercises
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})
//Not working:
// Array.from(wodItem).forEach((el)=>{
//     el.addEventListener('click', markWodClassComplete)
// })


//WOD FUNCTIONS:

//Changes CSS
function markWodClassComplete() {
    const normalId = this.id
    document.getElementById(`${normalId}`).className = 'wod' + ' completed' 
    console.log('Updated Class')
}
//Updates Score in DB
async function markWodComplete(){
    const normalId = this.id
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markWodComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        // const newCSS = await markWodClassComplete(normalId);
        console.log(data)
        location.reload()
        
    }catch(err){
        console.log(err)
    }
}

// CRUD FUNCTIONS FOR ADD -ON EXERCISES 


async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
       
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}





// async function markWodIncomplete(){
//     wodComplete.className = "not";
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markWodIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }


// function markWodClassNotComplete() {
//     const normalId = this.id
//     document.getElementById(`${normalId}`).className = 'wod' + ' not' 
//     console.log('Updated Class')
// }

//WODS Functions

