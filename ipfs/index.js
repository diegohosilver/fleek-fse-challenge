const express = require('express')
const hostValidation = require("host-validation")

const app = express()

app.use(hostValidation({ hosts: ['localhost:3000'] }))

// parse requests of content-type - application/json
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Up and running!')
})

// routes setup
require('./routes/ipfs.routes')(app);

const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})