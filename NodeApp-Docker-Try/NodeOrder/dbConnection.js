var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "shipfast-mysql.cluster-crgf5orxqoxk.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "1q2w3e4r",
    database:"shipfast"
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;