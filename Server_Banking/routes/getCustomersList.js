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
    let customersList = {
        results: []
    };
    let e_id = req.body.employee_id
    connection.query('SELECT * FROM agent WHERE e_id=?', [e_id], function (error, results) {
        if (error) {
            console.log("error occurred", error);
            res.status(400).json({
                failed: "error occurred"
            })
        } else {
            for (i = 0; i < results.length; i++) {
                connection.query('SELECT * FROM customers WHERE customer_id=?',
                    [results[i].c_id], function (error, results) {
                        if (error) {
                            console.log("error occurred", error);
                            res.status(400).json({
                                failed: "error occurred"
                            })
                        }else{
                            customersList.results = customersList.results.concat(result);
                        }
                        
                    });
            }
            console.log('The solution is: ', result);
            res.status(200).json(customersList);
        }
    });
}