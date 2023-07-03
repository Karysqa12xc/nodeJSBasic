import { json } from "body-parser";
import pool from "../configs/connectDB";
let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    let check = await pool.execute('SELECT * FROM `users`');
    console.log(check);
    return res.render(`index.ejs`, { dataUser : rows, test: "abc string test"});
}

let getDetailPage  = async (req, res) =>{
    let id = req.params.id;
    let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return res.send(JSON.stringify(user));
}
module.exports = {
    getHomepage, getDetailPage
}