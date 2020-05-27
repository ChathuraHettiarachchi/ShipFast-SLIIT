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

app.post('/api/v1/auth', (req, res) => {
    console.log('Request received');
    if (req.body != null && req.body.username != null && req.body.password != null){
        con.connect(function(err) {
            con.query('SELECT * FROM users WHERE username=? AND password=?;',[req.body.username, req.body.password], function(err, results, fields) {
                if (err) res.send(err);
                if (results.length > 0){
                    token = srs({length: 64});
                    con.query('UPDATE users SET token=? WHERE id=?',[token, results[0].id])
                    res.status(200).json({
                        status: true,
                        message: 'User found',
                        user: {
                            id: results[0].id,
                            username: results[0].username,
                            email: results[0].email            
                        },
                        auth_token: token
                    });
                } else {
                    res.status(404).json({status: false, message: "Invalid login"});
                }
            });
        });
    } else {
        res.status(404).json({status: false, message: "Invalid params"});
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));