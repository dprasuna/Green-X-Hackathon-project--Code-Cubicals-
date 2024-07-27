const express = require('express');
const nftService = require('./nftService');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');


const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/uploadFile', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    res.status(200).json({ filePath: req.file.path });
  });


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.post('/createNFT', (req, res) => {
    console.log('Creating NFT...');
    console.log('Request body:', req.body);
    nftService.createNFT(req.body.issuerSecret, req.body.receiverSecret, req.body.receiverPublicKey, req.body.nftName, req.body.nftMetadata, req.body.filePath);
    res.status(200).send('NFT created successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
