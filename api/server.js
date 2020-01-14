const express = require('express')
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send(`
        <h1>Lambda Blog</h1>
    `)
})

module.exports = server