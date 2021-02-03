const uploadFile = require("../middleware/upload");
const compressFile = require("../compress/compress-file.js");
const fs = require("fs");
const baseUrl = "http://localhost:3000/files/";


const createDir = function () {
    const dirPath = __basedir + "/uploads";
    const dirName = String(Date.now());
    const fullPath = `${dirPath}/${dirName}`;

    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
    }
    return dirName;
}

const upload = async (req, res) => {
    try {
        req.dirName = createDir();
        await uploadFile(req, res);

        if (req.files == undefined) {
            return res.status(400).send({message: "Please upload a file!"});
        }

        res.status(200).send({
            dirName: req.dirName, //+ req.files.originalname,
        });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 100MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: `, //${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    if (!req.query.dirName) {
        res.status(200).send(null);
        return;
    }

    let directoryPath = __basedir + "/uploads/";
        directoryPath += req.query.dirName + "/";

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        const fileInfos = [];

        files.forEach( file => {
            const fileStats = fs.statSync(directoryPath + file);
            fileInfos.push({
                name: file,
                size: (fileStats.size / (1024 * 1024)).toFixed(3),
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/uploads/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

const onCompressFiles = (req, res) => {
    try {
        if (!req.query.dirName) {
            res.status(500).send(null);
            return;
        }
        compressFile(req.query.dirName).then((dirPath) => {
            req.dirName = dirPath;
            getListFiles(req, res);
        }).catch(err=>{
            console.log(err);
            return res.status(500).send({
                message: err,
            });
        })
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 100MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: `, //${req.file.originalname}. ${err}`,
        });
    }
};

module.exports = {
    upload,
    getListFiles,
    download,
    onCompressFiles,
};
