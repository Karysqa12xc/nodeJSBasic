import express from 'express';
import 'dotenv/config';
import configViewEngine from './configs/viewEngine';
const app = express();
import initWebRoute from "./route/web";
import initApiRoute from "./route/api";
app.use(express.urlencoded({extende: true}));
app.use(express.json());
// import connection from './configs/connectDB';
const port = process.env.PORT || 8080;
//setup view engine
configViewEngine(app);
//init web route
initWebRoute(app);
//init api route
initApiRoute(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 