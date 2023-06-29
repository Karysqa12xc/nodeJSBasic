import express from 'express';
import 'dotenv/config';
import configViewEngine from './configs/viewEngine';
const app = express();
const port = process.env.PORT || 8080;
console.log(">>> check port", port);
configViewEngine(app);

app.get('/', (req, res) => {
    res.render(`index.ejs`);
})

app.get('/about', (req, res)=>{
    res.send(`My name is nam`);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 