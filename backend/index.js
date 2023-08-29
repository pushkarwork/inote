const express = require("express");
const app = express();
const port = 5000;
require("./db");
var cors = require('cors')

app.use(cors())


// Middleware to use json data in express
app.use(express.json())

// ROUTES IN OUR APP
app.use("/v1/auth", require("./routes/auth"))
app.use("/v1/notes", require("./routes/notes"))



app.listen(port, () => {
    console.log("server connected")
})