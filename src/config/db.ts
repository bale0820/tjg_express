// const mysql = require('mysql2/promise');
// const mysql = require('mysql2/promise');
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'mysql1234',
    database : 'candy'
});

export const promisePool = pool;

