const express = require('express')
const path = require('path')
const app = express()

const staticDirectoryName = process.env.STATIC_DIR || 'dist'
const serverPath = path.join(__dirname, '/', staticDirectoryName)
app.use(express.static(serverPath))

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on', port))
