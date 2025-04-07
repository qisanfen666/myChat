const pool = require('../utils/db.cjs')
const bcrypt = require('bcrypt')

const createUser = (async (username,password)=>{
    try{
        const hashedPassword = await bcrypt.hash(password,10)
        const sql = `INSERT INTO users (username,password) VALUES (?,?)`
        const result = await pool.query(sql,[username,hashedPassword])
        return result
    }
    catch(err){
        console.log('createUser error : ',err)
    }
})

const getUser = (async (username)=>{
    try{
        const sql = `SELECT * FROM users WHERE username = ? `
        const [rows] =await pool.query(sql,[username])
        return rows[0]
    }
    catch(err){
        console.log('getUser error : ',err)
    }
})

module.exports = {
    createUser,
    getUser
}