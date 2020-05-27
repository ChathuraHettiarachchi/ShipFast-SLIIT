const mysql = require('mysql');

const con = mysql.createConnection({
    host: "shipfast-mysql.cluster-crgf5orxqoxk.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "1q2w3e4r"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query('CREATE DATABASE IF NOT EXISTS shipfast;');
    con.query('USE shipfast;');
    con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), password varchar(255), token varchar(255), PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    con.query('CREATE TABLE IF NOT EXISTS orders(id int NOT NULL AUTO_INCREMENT, item_name varchar(30), quantity int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    con.query('CREATE TABLE IF NOT EXISTS deliveries(id int NOT NULL AUTO_INCREMENT, status varchar(10), order_id int, PRIMARY KEY(id), FOREIGN KEY (order_id) REFERENCES orders(id));', function(error, result, fields) {
        console.log(result);
    });
    con.query('INSERT INTO users(id, username, email, password) VALUES(1, "choota", "chathura93@yahoo.com", "1q2w3e4r") ON DUPLICATE KEY UPDATE id=1, username="choota", email="chathura93@yahoo.com", password="1q2w3e4r";', function(error, result, fields) {
        console.log(result);
    });
    con.query('SHOW TABLES;', function(error, result, fields) {
        console.log(result);
    });
    con.end();
});