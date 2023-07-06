import pool from "../configs/connectDB";
let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render(`index.ejs`, { dataUser: rows });
}

let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let sqlRead = "SELECT * FROM users WHERE id = ?";
    let [user] = await pool.execute(sqlRead, [id]);
    return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
    let { FirstName, LastName, Email, address } = req.body;
    let sqlCreate = "INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)"
    await pool.execute(sqlCreate, [FirstName, LastName, Email, address]);
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userDeleteId
    let sqlDelete = "DELETE FROM users WHERE id = ?"
    await pool.execute(sqlDelete, [userId]);
    return res.redirect('/');
}
let editInfoUser = async (req, res) => {
    let id = req.params.id;
    let sqlRead = "SELECT * FROM users WHERE id = ?"
    let [user] = await pool.execute(sqlRead, [id]);
    return res.render(`update.ejs`, { dataUser: user[0] });
}
let updateUserForm = async (req, res) => {
    let { FirstName, LastName, Email, address, id } = req.body;
    let sqlUpdate = "UPDATE users SET firstName = ?, lastName = ?,email = ? ,address = ? WHERE id = ?";
    await pool.execute(sqlUpdate, [FirstName, LastName, Email, address, id])
    return res.redirect('/');
}
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editInfoUser, updateUserForm
}