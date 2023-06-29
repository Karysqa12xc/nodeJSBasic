import  express, { Router } from "express";
import homeController from "../controller/homeController";
import { getAboutPage } from "../controller/aboutController";
let router = express.Router();

const initWebRoute = (app) => {
    router.get("/", homeController.getHomepage);
    router.get('/about', getAboutPage)
    return app.use("/", router); 
}

module.exports = initWebRoute;