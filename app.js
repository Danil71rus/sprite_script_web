const ip = require("ip")
const express = require('express')
const cors = require('cors')

// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

const app = express()

app.use(cors())

// const hostname = ip.address()
const hostname = "localhost"
const port = 3000
const compressFile = require("./dop_script/compress-file")

// app.get('/', (req, res) => {
//     res.send('Hiiii!')
// })

//
// var storage =   multer.diskStorage({
//     destination: function (req, file, callback) {
//         fs.mkdir('./uploads', function(err) {
//             if(err) {
//                 console.log(err.stack)
//             } else {
//                 callback(null, './uploads');
//             }
//         })
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now());
//     }
// });
//
// app.post('/api/file',function(req,res){
//     var upload = multer({ storage : storage}).single('userFile');
//     upload(req,res,function(err) {
//         if(err) {
//             return res.end("Error uploading file.");
//         }
//         res.end("File is uploaded");
//     });
// });

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
