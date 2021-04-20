const express = require('express')
const cors = require("cors")

const app = express()

var corsOptions = {
    origin: "http://localhost:9000"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// database initialization
const db = require("./models");
db.initialize();

app.get('/', (req, res) => {
    res.send('Up and running!')
})

// routes setup
require('./routes/auth.routes')(app);
require('./routes/keys.routes')(app);
require('./routes/proxy.routes')(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})