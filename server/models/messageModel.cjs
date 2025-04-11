const pool = require('../utils/db.cjs')

const saveMessage = async (room,user,text)=>{
    const sql ='INSERT INTO messages (room,user,text) VALUES (?,?,?);'
    try{
        await pool.query(sql,[room,user,text])
    }
    catch(err){
        console.log(err)
    }
}

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