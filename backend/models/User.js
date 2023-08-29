// import mongoose from 'mongoose';
const mongoose = require("mongoose")
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: "string",
        required: true,

    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    password: {
        type: "string",
        required: true
    }
});

const userSchema = mongoose.model('UserSchema', UserSchema);

module.exports = userSchema;