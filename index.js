const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const connectDB = require('./util/database');
const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('public', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')))
// http://localhost:3000/images/1639661067893-boat.jpg
connectDB();

app.use('/', require('./routes/auth'));
app.use('/post', require('./routes/post'));
app.use('/status', require('./routes/status'));

// Use Node Environment Variables
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});