import  express, { Router } from "express";
import homeController from "../controller/homeController";
import { getAboutPage } from "../controller/aboutController";
let router = express.Router();

const initWebRoute = (app) => {
    router.get("/", homeController.getHomepage);
    router.get("/detail/user/:id", homeController.getDetailPage);
    router.get('/about', getAboutPage)
    router.post('/create-new-user', homeController.createNewUser);
    router.post("/delete-user", homeController.deleteUser);
    router.get("/edit-user/:id", homeController.editInfoUser);
    router.post("/update-user", homeController.updateUserForm);
    return app.use("/", router); 
}

module.exports = initWebRoute;