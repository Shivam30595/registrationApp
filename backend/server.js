const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const routes = require("./routes/routes")(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

app.use("/api", routes);
app.get("/", (req, res) => {
    res.send("I am ready to server requests");
})

app.listen(port, () => {
    console.log("Listening on port", port);
})