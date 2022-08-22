const mongoose = require('mongoose')

const TodoListSchema = new mongoose.Schema({
    todo: { type: String, required: true, unique: true}
}, { timestamps: true })

module.exports = mongoose.model("TodoList", TodoListSchema)