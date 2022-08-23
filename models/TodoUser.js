const mongoose = require('mongoose')

const TodoUserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    isAdmin: { type: Boolean, default: false},
    img: {type: String}
}, { timestamps: true });

module.exports = mongoose.model("TodoUser", TodoUserSchema)