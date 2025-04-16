const pool = require('../utils/db.cjs')

//保存消息到数据库的函数
const saveMessage = async (room,user,text)=>{
    const sql ='INSERT INTO messages (room,user,text) VALUES (?,?,?);'
    try{
        await pool.query(sql,[room,user,text])
    }
    catch(err){
        console.log(err)
    }
}

//根据房间号获取消息的函数
const getMessagesByRoom =async (room)=>{
    const sql = 'SELECT * FROM messages WHERE room = ?;'
    try{
        const [rows] = await pool.query(sql,[room])
        //console.log(rows)
        return rows
    }
    catch(err){
        console.log(err)
    }
}

module.exports ={
    saveMessage,
    getMessagesByRoom
}