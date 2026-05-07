// const mysql = require('mysql2/promise');
// const mysql = require('mysql2/promise');
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql1234',
    database: 'candy',
    typeCast: function (field, next) {
        if (field.type === 'BIT' && field.length === 1) {
            const bytes = field.buffer();
            // 버퍼의 첫 번째 바이트가 1이면 true, 0이면 false 반환
            return bytes ? bytes[0] === 1 : false;
        }
        return next();
    }
});

export const promisePool = pool;

