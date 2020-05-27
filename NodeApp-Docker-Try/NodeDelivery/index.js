const srs = require('secure-random-string');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con = require('./dbConnection');

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1/delivery/:id', (req, res) => {
    console.log('Request received');
    if (req.query != null && req.query.token != null && req.params.id != null){
        con.connect(function(err) {
            con.query('SELECT * FROM users WHERE token=?;',[req.query.token], function(err, results, fields) {
                if (err) res.send(err);
                if (results.length > 0){
                    con.query('SELECT * FROM deliveries WHERE order_id=?;',[req.params.id], function(err, results, fields) {
                        res.status(200).json({status: true, message: "Details found", content:{delivery:results}});
                    })
                } else {
                    res.status(404).json({status: false, message: "Invalid user authentication"});
                }
            });
        });
    } else {
        res.status(404).json({status: false, message: "Invalid params, you need to have the token"});
    }
});

app.post('/api/v1/delivery/:id', (req, res) => {
    console.log('Request received');
    if (req.body != null && req.body.token != null && req.params.id != null){
        con.connect(function(err) {
            con.query('SELECT * FROM users WHERE token=?;',[req.body.token], function(err, results, fields) {
                if (err) res.send(err);
                if (results.length > 0){
                    con.query('UPDATE deliveries SET status=? WHERE order_id=?;',["CANCELED",req.params.id], function(err, results, fields) {
                        res.status(200).json({status: true, message: "Order status has been updated"});
                    })
                } else {
                    res.status(404).json({status: false, message: "Invalid user authentication"});
                }
            });
        });
    } else {
        res.status(404).json({status: false, message: "Invalid params, you need to have the token"});
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));