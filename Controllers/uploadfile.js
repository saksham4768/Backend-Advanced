const filesModel = require('../Models/fileModel');
const cloudinary = require('cloudinary').v2;
 //Local File upload Handler
 exports.localFileUpload = async (req, res) =>{
    try{

        //Fetch File
        const file = req.files.file;
        console.log("File Is -> ", file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path Is -> ", path);

        file.mv(path, (err) =>{
            console.log(err);
        });

        res.json({
            success: true,
            message: 'Local File Uploaded Successfully',
        });
    }
    catch(error){
        console.log(error);
    }
 }

 //Function for Supported Type
 function isFileTypeSupported(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
 }

//Upload File in Cloudinary
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    console.log("tempfile path", file.tempFilePath);
    
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
 //Handler for Image upload in cloudinary and server
 exports.imageUpload = async (req, res) =>{
    try{

        //Data fetch
        const{name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation for Supported type image upload
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1];

        console.log("File Type: ", fileType);

        //If file format is not formatted
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format is not supported',
            })
        }

        //File format is supported
        const response = await uploadFileToCloudinary(file, "FilesData");
        console.log(response);

        //Save entry in DB
        const fileData = await filesModel.create({
            name,
            tags,
            email,
            ImageUrl: response.secure_url,
        });

        res.status(200).json({
            success: true,
            fileData: fileData,
            imageUrl: response.secure_url,
            message: "Image Uploaded Successfully"
        })
    }
    catch(error){
        console.error(error);

        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
 }

 //Handler for Video upload in cloudinary and server
 exports.videoUpload = async (req, res) =>{
    try{

        //Data fetch
        const{name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation for Supported type image upload
        const supportedTypes = ["mp4","jpeg","mov"];
        const fileType = file.name.split('.')[1];

        console.log("File Type: ", fileType);

        //If file format is not formatted
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format is not supported',
            })
        }

        //File format is supported
        const response = await uploadFileToCloudinary(file, "FilesData");
        console.log(response);

        //Save entry in DB
        const fileData = await filesModel.create({
            name,
            tags,
            email,
            ImageUrl: response.secure_url,
        });

        res.status(200).json({
            success: true,
            fileData: fileData,
            imageUrl: response.secure_url,
            message: "Video Uploaded Successfully"
        })
    }
    catch(error){
        console.error(error);

        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
 }

 //Handler for Image upload with reduced size in cloudinary and server
 exports.ImageSizeReducer = async (req, res) =>{
    try{

        //Data fetch
        const{name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation for Supported type image upload
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1];

        console.log("File Type: ", fileType);

        //If file format is not formatted
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File format is not supported',
            })
        }

        //File format is supported
        const response = await uploadFileToCloudinary(file, "FilesData", 50);
        console.log(response);

        //Save entry in DB
        const fileData = await filesModel.create({
            name,
            tags,
            email,
            ImageUrl: response.secure_url,
        });

        res.status(200).json({
            success: true,
            fileData: fileData,
            imageUrl: response.secure_url,
            message: "Image Reduced and Uploaded Successfully"
        })
    }
    catch(error){
        console.error(error);

        res.status(400).json({
            success: false,
            message: "Something Went Wrong",
        })
    }
 }
