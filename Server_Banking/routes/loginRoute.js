/**
 * SJSU CMPE226 Fall2019 TEAM4
 * 
 *  */


const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '6112049qaZ',
//     database: 'cloudprint'
// });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '98765432',
    database: '226team'
});

exports.login = function (req, res) {
    console.log('login: req', req.body);
    connection.query('SELECT * FROM employees WHERE username = ?',
        [req.body.username], function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                // console.log(req.body)
                if (results.length > 0) {
                    connection.query('SELECT * FROM employees WHERE username = ? AND password = SHA1(?)',
                        [results[0].username, req.body.password], function (error, result) {
                            if (error) {
                                console.log("error occurred", error);
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            }
                            if (result.length > 0) {
                                res.status(200).json({
                                    message: "login successfully",
                                    data: results[0]
                                })
                            } else {
                                res.status(200).json({
                                    message: "Password incorrect"
                                })
                            }

                        });
                } else {
                    res.status(200).json({
                        message: "User doesn't exist"
                    })
                }
            }
        });
}