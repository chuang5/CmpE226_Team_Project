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

exports.getCustomerInfo = function (req, res) {
    let customerInfo = [];
    customer_id = req.body.customer_id;
    connection.query('SELECT * FROM customers WHERE customer_id = ?', [customer_id],
        function (error, result) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                console.log('The solution is: ', result);
                customerInfo = customerInfo.concat({"info":result});
            }
        });
    connection.query('SELECT * FROM agent WHERE c_id = ?', [customer_id],
        function (error, result) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                console.log('The solution is: ', result);
                customerInfo = customerInfo.concat({"agent":result});
            }
        });
    connection.query('SELECT * FROM checking_statement WHERE user = ?', [customer_id],
        function (error, result) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                console.log('The solution is: ', result);
                customerInfo = customerInfo.concat({"checking_statement":result});
            }
        });
    connection.query('SELECT * FROM saving_statement WHERE user = ?', [customer_id],
        function (error, result) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                console.log('The solution is: ', result);
                customerInfo = customerInfo.concat({"saving_statement":result});
            }
        });
        connection.query('SELECT * FROM credit_statement WHERE user = ?', [customer_id],
        function (error, result) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                console.log('The solution is: ', result);
                customerInfo = customerInfo.concat({"credit_statement":result});
            }
        });
        connection.query('SELECT * FROM frieness WHERE user = ?', [customer_id],
        function (error, result) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                console.log('The solution is: ', result);
                customerInfo = customerInfo.concat({"frieness":result});
            }
        });
    connection.query('SELECT * FROM checking WHERE customer = ?',
        [customer_id],
        function (error, result) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                console.log('The solution is: ', result);
                customerInfo = customerInfo.concat({"checking_accounts":result});
                
            }
        });
        connection.query('SELECT * FROM saving WHERE customer = ?',
        [customer_id],
        function (error, result) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                console.log('The solution is: ', result);
                customerInfo = customerInfo.concat({"saving_accounts":result});
                
            }
        });
        connection.query('SELECT * FROM credit_card WHERE customer = ?',
        [customer_id],
        function (error, result) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                console.log('The solution is: ', result);
                customerInfo = customerInfo.concat({"credit_cards":result});
                res.status(200).json({customerInfo})
            }
        });
}