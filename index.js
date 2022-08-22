const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
MONGO_URL = "mongodb+srv://admin:Kitchener121!@cluster0.y7mlk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const todoRoute = require('./routes/TodoList')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send('API')
})

app.use('/api', todoRoute)

mongoose.connect(MONGO_URL)
.then(()=> console.log("DB connection successfull"))
.catch((err) => console.log(err))

app.listen(5000, ()=> console.log(`Server running`))