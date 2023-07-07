import  express, { Router } from "express";
import { getAboutPage } from "../controller/aboutController";
import APIController from  "../controller/APIController";
let router = express.Router();

const initApiRoute = (app) => {
    router.get("/user", APIController.getAllUser);//methob get
    router.post("/create-user-api", APIController.createNewUser); //method post
    router.put("/update-user-api", APIController.updateNewUser); //methob put
    router.delete("/delete-user-api/:id", APIController.deleteNewUser); // method delete
    return app.use("/api/v1/", router); 
}

module.exports = initApiRoute;