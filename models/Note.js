//Import mongoose package
const mongoose = require("mongoose");

//define Note schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

//Create Note model from noteSchema
const Note = mongoose.model("Note", noteSchema);

module.exports = Note;