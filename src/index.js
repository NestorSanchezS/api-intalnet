const express = require("express")
require('express-async-errors');
const morgan = require("morgan")
const fileUpload = require("express-fileupload");
const createRootUserIfNotExists = require("./scripts/create_superuser");


app = express()

// middlewares
app.use(morgan(process.env.LOG_FORMAT || "tiny"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles : true, tempFileDir : '/tmp/'}));
app.use(express.static("src/public"))
app.use(require("./middlewares/cors"));
app.use(require("./middlewares/auth"))

// routes
app.use("/ping", (req, res) => res.send("pong"))
app.use("/api/v1", require("./routers"))

// error handling
app.use(require("./middlewares/errors"))

// run
const port = process.env.PORT || 3300 
app.listen(port, async () => {
    console.log("server on port", port);

    await createRootUserIfNotExists()
});
