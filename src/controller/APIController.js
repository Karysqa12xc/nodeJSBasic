import pool from "../configs/connectDB"
let getAllUser = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM users");
    return res.status(200).json({
        message: 'nam',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let { FirstName, LastName, Email, address } = req.body;

    if (!FirstName || !LastName || !Email || !address) {
        return res.status(200).json({
            message: 'missing require params'
        })
    }

    let sqlCreate = "INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)"
    await pool.execute(sqlCreate, [FirstName, LastName, Email, address]);
    return res.status(200).json({
        message: 'ok'
    })
}




let updateNewUser = async (req, res) => {
    let { FirstName, LastName, Email, address, id } = req.body;
    let sqlUpdate = "UPDATE users SET firstName = ?, lastName = ?,email = ? ,address = ? WHERE id = ?";
    await pool.execute(sqlUpdate, [FirstName, LastName, Email, address, id])
    if (!FirstName || !LastName || !Email || !address || !id) {
        return res.status(200).json({
            message: 'missing require params'
        })
    }
    return res.status(200).json({
        message: 'ok'
    })
}

let deleteNewUser = async (req, res) => {
    let id = req.params.id;
    let sqlDelete = "DELETE FROM users WHERE id = ?";
    await pool.execute(sqlDelete, [id]);
    if(!id){
        return res.status(200).json({
            message: 'missing require params'
        })
    }
    return res.status(200).json({
        message: 'ok'
    })
}
module.exports = {
    getAllUser, createNewUser, updateNewUser, deleteNewUser
}