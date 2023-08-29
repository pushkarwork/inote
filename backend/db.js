const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/inote").then(() => {
    console.log("connected the db")

}).catch((e) => {
    console.log(e)
})

