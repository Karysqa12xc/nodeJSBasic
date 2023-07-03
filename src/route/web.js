import  express, { Router } from "express";
import homeController from "../controller/homeController";
import { getAboutPage } from "../controller/aboutController";
let router = express.Router();

const initWebRoute = (app) => {
    router.get("/", homeController.getHomepage);
    router.get("/detail/user/:id", homeController.getDetailPage);
    router.get('/about', getAboutPage)
    return app.use("/", router); 
}

module.exports = initWebRoute;