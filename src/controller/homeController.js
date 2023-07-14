import pool from "../configs/connectDB";
import multer from "multer";
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
let uploadFilePage = async (req, res) => {
    return res.render("uploadFile.ejs");
}



let handlerUploadFile = async (req, res) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send("please select an image to upload");
        }
        res.send(`You have uploaded this image: <hr/><img src="/imgs/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
}

let handlerUploadMultipleFile = async (req, res) => {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.files) {
            return res.send("please select an image to upload");
        }
        let result = "You have uploaded these images: <hr/>";
        const files = req.files;
        let index, len;
        for(index = 0, len = files.length; index < len; ++index){
            result += (`You have uploaded this image: <hr/><img src="/imgs/${req.files[index].filename}" width="300" style="margin-right: 20px;">`);
        }
        result += '<hr/><a href ="/upload">Upload more image</a>'
        res.send(result);
}
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editInfoUser, updateUserForm,
    uploadFilePage, handlerUploadFile, handlerUploadMultipleFile,
}
