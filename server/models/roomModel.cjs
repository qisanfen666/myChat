const pool =require('../utils/db.cjs')

const createRoom = async (room)=>{
    if(!room){
        return
    }
    try{
        const sql = `INSERT INTO rooms (name) VALUES (?);`
        const result = await pool.query(sql,[room])
        return result
    }
    catch(err){
        console.log('createRoom error : ',err)
        throw err
    }
}

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
}