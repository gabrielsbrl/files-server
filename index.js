const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 3000;
const app = express();

// routes imports 
let files = require("./routes/files.js");

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// routes configuration
app.use('/files', files);

app.listen(port, console.log('Server listening at port: ', port));