const mysql = require('mysql2')

//创建连接池
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'061532',
    database:'mychat_db',
})

//检测数据库连接是否成功
pool.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = pool.promise();