// import mongoose from 'mongoose';
const mongoose = require("mongoose")
const { Schema } = mongoose;

const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    Title: {
        type: "string",
        required: true,
        minLength: 3
    },
    Description: {
        type: "string",
        required: true,
        minLength: 3
    },
    Date: {
        type: Date,
        default: Date.now()
    }
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;