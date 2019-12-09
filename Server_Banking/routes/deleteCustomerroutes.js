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

exports.deleteCustomer = function(req,res){
    console.log("deleteCustomer: req",req.body);
    const customer_id = req.body.customer_id;
    const employee_id = req.body.employee_id;
    const name = req.body.name;

    if(customer_id == null){
        connection.query('DELETE FROM employees WHERE employee_id = ? AND name = ?', 
        [employee_id, name], function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    message: "error occurred"
                })
            } else {
                console.log('The solution is: ', results);
            }
        });
        connection.query('DELETE FROM customers WHERE agent_id = ?', 
        [employee_id], function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    message: "error occurred"
                })
            } else {
                console.log('The solution is: ', results);
            }
        });
    }else{
        connection.query('DELETE FROM customers WHERE customer_id = ? AND name = ?',
        [customer_id, name], function (error, results) {
            if (error) {
                console.log("error occurred",error);
                res.status(400).json({
                    message:"error occurred"
                })
            }else{
                console.log('The solution is: ', results);
                connection.query('DELETE FROM user_accounts WHERE customer = ?', customer_id, function (error, results) {
                    if (error) {
                        console.log("error occurred",error);
                        res.status(400).json({
                            message:"error occurred"
                        })
                    }else{
                        console.log('The solution is: ', results);
                    }
                });
                connection.query('DELETE FROM checking WHERE customer = ?', customer_id, function (error, results) {
                    if (error) {
                        console.log("error occurred",error);
                        res.status(400).json({
                            message:"error occurred"
                        })
                    }else{
                        console.log('The solution is: ', results);
                    }
                });
                connection.query('DELETE FROM saving WHERE customer = ?', customer_id, function (error, results) {
                    if (error) {
                        console.log("error occurred",error);
                        res.status(400).json({
                            message:"error occurred"
                        })
                    }else{
                        console.log('The solution is: ', results);
                    }
                });
                connection.query('DELETE FROM credit_card WHERE customer = ?', customer_id, function (error, results) {
                    if (error) {
                        console.log("error occurred",error);
                        res.status(400).json({
                            message:"error occurred"
                        })
                    }else{
                        console.log('The solution is: ', results);
                    }
                });
            }
        });
    }
    function returnResult() {
        res.status(200).json({message:"Customer delete successfully"});
    }
    setTimeout(returnResult, 200);
}