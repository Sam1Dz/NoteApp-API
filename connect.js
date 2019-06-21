'use strict'

const mysql = require('mysql');
require('dotenv').config();

const connectSQL = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connectSQL.connect(function(err){
    if (err) throw err;
});

module.exports = connectSQL;