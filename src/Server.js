import express from 'express';
import 'dotenv/config';
import configViewEngine from './configs/viewEngine';
var morgan = require('morgan');
const app = express();
const port = process.env.PORT || 8080;

import initWebRoute from "./route/web";
import initApiRoute from "./route/api";
app.use(express.urlencoded({extende: true}));
app.use(express.json());

app.use(morgan('combined'));
app.use((req, res, next) =>{
    console.log(">>>run into my middleware");
    console.log(req.method);
    next();
})
// import connection from './configs/connectDB';


//setup view engine
configViewEngine(app);
//init web route
initWebRoute(app);
//init api route
initApiRoute(app);
//handle 404 not found
app.use((req, res) =>{
  return res.render("404.ejs");
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 