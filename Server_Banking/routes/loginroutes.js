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
    connection.query('SELECT * FROM customers WHERE username = ?',
        [req.body.username], function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                // console.log(req.body)
                if (results.length > 0) {
                    var pswString = results[0].password;
                    connection.query('SELECT encryption FROM encryptpsw WHERE origin = ?',
                        [req.body.password], function (error, result) {
                            if (error) {
                                console.log("error occurred", error);
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            }
                            if (result.length > 0 && pswString == result[0].encryption) {
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