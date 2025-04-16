const pool = require('../utils/db.cjs')
const bcrypt = require('bcrypt')

//创建用户的函数
const createUser = async (username,password)=>{
    try{
        const hashedPassword = await bcrypt.hash(password,10)
        const sql = `INSERT INTO users (username,password) VALUES (?,?) ;`
        const result = await pool.query(sql,[username,hashedPassword])
        return result
    }
    catch(err){
        console.log('createUser error : ',err)
        throw err
    }
}

//获取用户的函数
const getUser = async (username)=>{
    try{
        const sql = `SELECT * FROM users WHERE username = ? ;`
        const [rows] = await pool.query(sql,[username])
        return rows[0]
    }
    catch(err){
        console.log('getUser error : ',err)
        throw err
    }
}

//获取用户加入的房间的函数
const getUserRooms = async (username)=>{
    try{
        const sql1 = `SELECT room_id FROM user_rooms Where user_id = (SELECT id FROM users WHERE username= ?);`
        const sql2 = `SELECT name FROM rooms WHERE id = ?;`

        const [rows1] = await pool.query(sql1,[username])
        console.log('rows1:',rows1)
        /// 查询每个房间的名称
        const roomNames = await Promise.all(
            rows1.map(async (row) => {
                const [roomRows] = await pool.query(sql2, [row.room_id]) // 使用 row.room_id
                return roomRows[0]?.name // 返回房间名称
            })
        );
        console.log('rows2:',roomNames)
        return roomNames
        
    }
    catch(err){
        console.log('getUserRooms error : ',err)
        throw err
    }
}

module.exports = {
    createUser,
    getUser,
    getUserRooms,
}