const ip = require("ip");
const fs = require('fs');
const cors = require("cors");
const express = require("express");
const path = require('path');

const config = require("./my.config");

const app = express();
// const hostname = ip.address();
const hostname = config.serverFile.host;
const port = config.serverFile.port;

const htmlPath = path.join(__dirname, 'dist');
app.use(express.static(htmlPath));


global.__basedir = __dirname;
const dir = __basedir + "/uploads";
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


const corsOptions = {
    origin: `http://${hostname}:${config.client.port}`,
};
app.use(cors(corsOptions));

const initRoutes = require("./server/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
