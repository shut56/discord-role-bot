const express = require('express')

const { port } = require('./config')
const { discordBotOn } = require('./services/discord')

const server = express()
const PORT = port || 8080

discordBotOn()

server.get('/', (req, res) => {
  res.json({ status: 'success' })
})

server.listen(PORT)

console.log(`Server: http://localhost:${PORT}`)
