const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileModel = new mongoose.Schema({
    name:{
        type: String,
    },
    ImageUrl:{
        type: String,
    },
    tags:{
        type: String,
    },
    email:{
        type: String,
    }
});

fileModel.post("save", async function(doc){
    try{

        console.log(doc);

        //Transporter
        let transport = nodemailer.transport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                password: process.env.MAIL_PASSWORD,
            }
        });

        //Send mail
        let info = transport.sendMail({
            from:`saksham`,
            to:doc.email,
            subject:"File uploaded Successfully in cloudinary",
            html:`<h1>Hello Man</h1><p>File Uploaded Successfully view here : <a href=${doc.ImageUrl}>Here is your link</a></p>`
        })
    }
    catch(error){
        console.error(error);

    }
})

const File = mongoose.model("File", fileModel);
module.exports = File;