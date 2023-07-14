import  express, { Router } from "express";
import homeController from "../controller/homeController";
import { getAboutPage } from "../controller/aboutController";
import multer from 'multer';
var appRoot = require('app-root-path');
import path from 'path';

let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, appRoot + "/src/public/imgs");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb){
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|)$/)){
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });
let upload1 = multer({storage: storage, fileFilter: imageFilter}).array('multiple_images', 3);
const initWebRoute = (app) => {
    router.get("/", homeController.getHomepage);
    router.get("/detail/user/:id", homeController.getDetailPage);
    router.get('/about', getAboutPage)
    router.post('/create-new-user', homeController.createNewUser);
    router.post("/delete-user", homeController.deleteUser);
    router.get("/edit-user/:id", homeController.editInfoUser);
    router.post("/update-user", homeController.updateUserForm);
    router.get("/upload", homeController.uploadFilePage);
    router.post("/upload-profile-pic", upload.single("profile-pic"), homeController.handlerUploadFile);
    router.post("/upload-multiple-images", (req, res, next) => {
        upload1(req, res, (err) =>{
            if(err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE"){
                res.send('LIMIT_UNEXPECTED_FILE');
            }else if(err){
                res.send(err)
            }else{
                next();
            }
        })
    }, homeController.handlerUploadMultipleFile)
    return app.use("/", router); 
}

module.exports = initWebRoute;