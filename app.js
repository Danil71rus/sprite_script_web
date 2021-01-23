const ip = require("ip")
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

// const hostname = ip.address()
const hostname = "localhost"
const port = 3000
const compressFile = require("./dop_script/compress-file")

// app.get('/', (req, res) => {
//     res.send('Hiiii!')
// })

app.get('/compress-file', (req, res) => {
    console.log(`req: ${req}`)
    const ress = compressFile();
    if (ress.error) {
        res.send(`Error: ${ress.error}!`)
    }
    // res.status(200).end()
    res.send('Sucsessful!')
})
app.listen(port, hostname, (err) => {
    if (err) {
        return console.log('Error: ', err)
    }
    console.log(`Server running at http://${hostname}:${port}/`)
})
