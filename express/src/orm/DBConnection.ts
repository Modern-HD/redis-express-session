import mysql, { Connection, MysqlError } from 'mysql';
import config from './DBConfig';

const con: Connection = mysql.createConnection(config);

con.connect((err: MysqlError) => {
    if(err) throw err;
    console.log("Connected!");
})

export default con;