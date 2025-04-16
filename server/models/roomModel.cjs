const pool =require('../utils/db.cjs')
const bcrypt = require('bcrypt')

//创建房间的函数
const createRoom = async (room,password)=>{
    if(!room||!password){
        return
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10)
        const sql = `INSERT INTO rooms (name,password) VALUES (?,?);`
        const result = await pool.query(sql,[room,hashedPassword])
        return result
    }
    catch(err){
        console.log('createRoom error : ',err)
        throw err
    }
}

//获取房间的函数
const getRoom = async (room)=>{
    try{
        const sql = `SELECT * FROM rooms WHERE name = ?;`
        const result = await pool.query(sql,[room])
        return result[0][0]
    }
    catch(err){
        console.log('getRoom error : ',err)
        throw err
    }
}

//检查用户是否在房间的函数
const isInRoom = async (username,room)=>{
    try{
        const sql = `SELECT * FROM user_rooms WHERE user_id = (SELECT id FROM users WHERE username = ?) AND room_id = (SELECT id FROM rooms WHERE name = ?);`
        const result = await pool.query(sql,[username,room])
        return result[0].length > 0
    }catch(err){
        console.log(err)
        return false
    }
}

//将用户加入房间的函数
const setUserRooms = async (username,room)=>{
    try{
        const sql1 = `SELECT id FROM users WHERE username = ?;`
        const sql2 = `SELECT id FROM rooms WHERE name = ?;`
        const sql3 = `INSERT INTO user_rooms (user_id,room_id) VALUES (?,?);`

        const [userId] = await pool.query(sql1,[username])
        const [roomId] = await pool.query(sql2,[room])
        const result = await pool.query(sql3,[userId[0].id,roomId[0].id])
        return result
    }
    catch(err){
        console.log('setUserRooms error : ',err)
        throw err
    }
}

module.exports = {
    setUserRooms,
    isInRoom,
    createRoom,
    getRoom,
}