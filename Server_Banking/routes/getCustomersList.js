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

exports.getCustomersList = function (req, res) {
    console.log(req.param)
    let customersList = [];
    let e_id = req.body.employee_id
    function returnList() {
        res.status(200).json({ customersList });
    }
    connection.query('SELECT * FROM agent WHERE e_id=?', [e_id], function (error, results) {
        if (error) {
            console.log("error occurred", error);
            res.status(400).json({
                message: "error occurred"
            })
        } else {
            for (i in results) {
                connection.query('SELECT * FROM customers WHERE customer_id=?',
                    [results[i].c_id], function (error, results) {
                        if (error) {
                            console.log("error occurred", error);
                            res.status(400).json({
                                message: "error occurred"
                            })
                        } else {
                            console.log('The solution is: ', results);
                            customersList = customersList.concat(results );
                        }
                    });
            }
            setTimeout(returnList, 100);
        }
    });
}

exports.getCustomersAccounts = function (req, res) {
    console.log(req.param)
    let customersAccounts = [];
    let e_id = req.body.employee_id
    function returnList() {
        res.status(200).json({ customersAccounts });
    }
    connection.query('SELECT * FROM agent WHERE e_id=?', [e_id], function (error, results) {
        if (error) {
            console.log("error occurred", error);
            res.status(400).json({
                message: "error occurred"
            })
        } else {
            for (i in results) {
                connection.query('SELECT * FROM user_accounts WHERE customer=?',
                    [results[i].c_id], function (error, results) {
                        if (error) {
                            console.log("error occurred", error);
                            res.status(400).json({
                                message: "error occurred"
                            })
                        } else {
                            console.log('The solution is: ', results);
                            customersAccounts = customersAccounts.concat(results );
                        }
                    });
            }
            setTimeout(returnList, 100);
        }
    });
}