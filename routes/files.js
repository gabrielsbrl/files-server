let express = require("express");
let router = express.Router();
let _ = require('lodash');

router.get('/', (req, res) => res.json({message: "work as get"}));
router.post('/', async (req, res) => {
    try {
        if(!req.files) {
            res.status(403).json({
                status: false,
                message: "no files to upload!"
            });
        } else {
            let pdf = req.files.pdf;
            pdf.mv('./uploads/' + pdf.name);
            res.status(200).json({
                status: true,
                message: 'File uploaded!',
                data: {
                    name: pdf.name,
                    mimetype: pdf.mimetype,
                    size: avatar.size,
                }
            });
        }
    } catch(ex) {
        res.status(500).json({error: ex.message});
    }
});
router.post('/multiple', async (req, res) => {
    try {
        if(!req.files) {
            res.status(403).json({
                status: false,
                message: "no files to upload!"
            });
        } else {
            let data = [];
            
            _.forEach(_.keysIn(req.files.pdfs), key => {
                let pdf = req.files.pdfs[key];
                pdf.mv('./uploads/' + pdf.name);
                data.push({
                    name: pdf.name,
                    mimetype: pdf.mimetype,
                    size: pdf.size
                });
            });

            res.status(200).json({
                status: true,
                message: 'Files are uploaded',
                data
            });
        }
    } catch(ex) {
        res.status(500).json({error: ex.message});
    }
});

module.exports = router;