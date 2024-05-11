//Instance of Express
const express = require('express');
const app = express(); 

const Upload = require('./Routes/fileUpload');
require('dotenv').config();

//Find PORT
const PORT = process.env.PORT || 5000;

//Middleware -> body Parser
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


//DatabAse Connection
const Connect = require('./Config/dataBase');
Connect.DBConnect();

//Cloudinary Connection
const cloudinary = require('./Config/cloudinary');
cloudinary.cloudinaryConnect();

//Mounting
app.use('/api/v1', Upload);

//Activate server
app.listen(PORT, () =>{
    console.log(`Server started successfully at PORT Number ${PORT}`);
})
