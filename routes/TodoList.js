const TodoList = require('../models/TodoList')

const router = require('express').Router()

//GET ALL TODOS
router.get('/todo', async(req, res) => {
    try {
        let todoLists = await TodoList.find();
        res.status(200).json(todoLists)
    }catch(err) {
        res.status(500).json(err)
    }
})

//CREATE NEW TODO
router.post('/todo', async(req, res) => {
    const newTodo = new TodoList(req.body)
    try {
        let savedTodo = await newTodo.save();
        res.status(200).json(savedTodo)
    }catch(err) {
        res.status(500).json(err)
    }
})

//UPDATE TODO
router.put('/todo', async(req, res) => {
    console.log(req.query.id)
    try {
        const updatedTodo = await TodoList.findByIdAndUpdate(req.query.id,
            {
                $set: req.body
            })
            res.status(200).json(updatedTodo)
    } catch(err) {
        console.log(err)
    }
})

router.delete('/todo', async(req, res) => {
    try {
        const deletedTodo = await TodoList.findByIdAndDelete(req.query.id)
        res.status(200).json(deletedTodo)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;