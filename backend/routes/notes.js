const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes")
// Getting bcryptJs for hiding the password
const bcrypt = require('bcrypt');
// Using Jwt for creating a token for a user
var jwt = require('jsonwebtoken');
const jwt_secKey = "pushkarNamberdar"
const fetchUser = require("../middleware/fetchUser")
// Getting the express Validator
const { body, validationResult } = require('express-validator');

const ValidValue = [body('Title').isLength({ min: 3 }),
body("Description").isLength({ min: 3 })]

// Fetch All Notes of a user
router.get("/Notes", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const note = await Notes.find({ user: userId })
        res.send(note)
    }
    catch (error) {
        res.status(400).json(error)

    }
}
)

// Creating a new note
router.post("/Notes", fetchUser, ValidValue, async (req, res) => {
    try {
        const note = await Notes.create({
            Title: req.body.Title,
            Description: req.body.Description,
            user: req.user.id
        })
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json(error)
    }
})

// Updating an Existing note
router.put("/Notes/:id", fetchUser, ValidValue, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { Title, Description } = req.body;
        const newNote = {}
        if (Title) { newNote.Title = Title }
        if (Description) { newNote.Description = Description }

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        // const updatedtheNote = await updatedNote.save()
        res.json({ note })
    } catch (error) {
        console.log(error)
    }


})

// Deleting a note
router.delete("/Notes/:id", fetchUser, async (req, res) => {
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }
    await Notes.findByIdAndDelete(req.params.id)
    res.json("Deleted the note")

})


module.exports = router;