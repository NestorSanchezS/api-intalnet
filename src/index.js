const express = require("express")
require('express-async-errors');
const morgan = require("morgan")
const fileUpload = require("express-fileupload")

const { cors } = require("./middlewares/cors")
const { errors } = require("./middlewares/errors")
const routes = require("./routers")

app = express()

// middlewares
app.use(cors);
app.use(morgan(process.env.LOG_FORMAT || "tiny"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles : true, tempFileDir : '/tmp/'}));
app.use(express.static("src/public"))

// routes
app.use("/ping", (req, res) => res.send("pong"))
app.use("/api/v1", routes)

// error handling
app.use(errors)

// run
const port = process.env.PORT || 3300 
app.listen(port, () => {
    console.log("server on port", port);
});
