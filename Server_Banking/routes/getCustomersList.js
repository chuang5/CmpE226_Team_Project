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
    console.log('getCustomersList: req', req.body);
    let customersList = [];
    let agent_id = req.body.employee_id
    function returnList() {
        res.status(200).json({ customersList });
    }
    if (agent_id == 1) {
        connection.query('SELECT * FROM employees WHERE employee_id NOT IN (1)',
            function (error, results) {
                if (error) {
                    console.log("error occurred", error);
                    res.status(400).json({
                        message: "error occurred"
                    })
                } else {
                    console.log('The solution is: ', results);
                    customersList = customersList.concat(results);
                }
            });
    }

    connection.query('SELECT * FROM agent WHERE agent_id=?', [agent_id], function (error, results) {
        if (error) {
            console.log("error occurred", error);
            res.status(400).json({
                message: "error occurred"
            })
        } else {
            for (i in results) {
                connection.query('SELECT * FROM customers WHERE customer_id=?',
                    [results[i].customer_id], function (error, results) {
                        if (error) {
                            console.log("error occurred", error);
                            res.status(400).json({
                                message: "error occurred"
                            })
                        } else {
                            console.log('The solution is: ', results);
                            customersList = customersList.concat(results);
                        }
                    });
            }
            setTimeout(returnList, 100);
        }
    });
}

exports.getCustomersAccounts = function (req, res) {
    console.log('getCustomersAccounts: req', req.body);
    let customersAccounts = [];
    let agent_id = req.body.employee_id
    function returnList() {
        res.status(200).json({ customersAccounts });
    }
    connection.query('SELECT * FROM agent WHERE agent_id=?', [agent_id], function (error, results) {
        if (error) {
            console.log("error occurred", error);
            res.status(400).json({
                message: "error occurred"
            })
        } else {
            for (i in results) {
                connection.query('SELECT * FROM user_accounts WHERE customer=?',
                    [results[i].customer_id], function (error, results) {
                        if (error) {
                            console.log("error occurred", error);
                            res.status(400).json({
                                message: "error occurred"
                            })
                        } else {
                            console.log('The solution is: ', results);
                            customersAccounts = customersAccounts.concat(results);
                        }
                    });
            }
            setTimeout(returnList, 100);
        }
    });
}