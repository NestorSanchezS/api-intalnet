const express = require("express")
const morgan = require("morgan")

const { cors } = require("./middlewares/cors")
const routes = require("./routers")

app = express()

// middlewares
app.use(cors);
app.use(morgan(process.env.LOG_FORMAT || "tiny"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use("/ping", (req, res) => res.send("pong"))
app.use("/api/v1", routes)

// run
const port = process.env.PORT || 3300 
app.listen(port, () => {
    console.log("server on port", port);
});
