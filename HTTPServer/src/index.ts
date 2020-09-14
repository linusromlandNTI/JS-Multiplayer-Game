import express from 'express'
import http from 'http'

const app = express()
const port = 3000

const filesDir = "./files/"

app.get('/', (req, res) => res.sendFile(filesDir + 'index.html'))

app.listen(port, () => console.log(`Server running on port ${port}!`))