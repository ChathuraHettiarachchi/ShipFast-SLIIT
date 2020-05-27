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

app.get('/api/v1/orders', (req, res) => {
    console.log('Request received');
    if (req.query != null && req.query.token != null){
        con.connect(function(err) {
            con.query('SELECT * FROM users WHERE token=?;',[req.query.token], function(err, results, fields) {
                if (err) res.send(err);
                if (results.length > 0){
                    con.query('SELECT * FROM orders', function(err, results, fields) {
                        res.status(200).json({status: true, message: "Orders found", content:{orders:results}});
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

app.post('/api/v1/order', (req, res) => {
    console.log('Request received');
    console.log(req.body.token);
    if (req.body != null && req.body.token != null && req.body.item_name != null && req.body.quantity != null){
        con.connect(function(err) {
            con.query('SELECT * FROM users WHERE token=?;',[req.body.token], function(err, results, fields) {
                if (err) res.send(err);
                if (results.length > 0){
                    con.query('INSERT INTO orders(item_name, quantity) VALUES(?, ?);',[req.body.item_name, req.body.quantity ], function(err1, result, fields) {
                        con.query('INSERT INTO deliveries(status, order_id) VALUES(?, (SELECT MAX(id) FROM orders));',['PENDIND'], function(err2, result, fields) {
                            if (err) res.status(400).json({status: false, message: "Something went wrong", content:{errors:err2}});
                            if (result) {
                                con.query('SELECT id as order_id, quantity, item_name FROM orders WHERE id=(SELECT MAX(id) FROM orders);', function(err2, result_order, fields) {
                                    res.status(200).json({status: true, message: "Order found", content:{order:result_order}});
                                })
                            }
                        })
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

app.get('/api/v1/order/:id', (req, res) => {
    console.log('Request received');
    console.log(req.query.token);
    if (req.query != null && req.query.token != null){
        con.connect(function(err) {
            con.query('SELECT * FROM users WHERE token=?;',[req.query.token], function(err, results, fields) {
                if (err) res.send(err);
                if (results.length > 0){
                    con.query('SELECT id as order_id, quantity, item_name FROM orders WHERE id=?;',[req.params.id], function(err, order, fields) {
                        if (order != null){
                            res.status(200).json({status: true, message: "Order found", content:{order:{order}}});
                        } else {
                            res.status(400).json({status: false, message: "Invalid order id"});
                        }
                    })
                } else {
                    res.status(400).json({status: false, message: "Invalid user authentication"});
                }
            });
        });
    } else {
        res.status(404).json({status: false, message: "Invalid params, you need to have the token"});
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));