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
    console.log("req",req.body);
    const customer_id = req.body.customer_id;

    connection.query('DELETE FROM customers WHERE customer_id = ?', customer_id, function (error, results) {
        if (error) {
            console.log("error occurred",error);
            res.status(400).json({
                message:"error occurred"
            })
        }else{
            console.log('The solution is: ', results);
        }
    });
    connection.query('DELETE FROM agent WHERE customer_id = ?', customer_id, function (error, results) {
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
    function returnResult() {
        res.status(200).json({message:"Customer delete successfully"});
    }
    setTimeout(returnResult, 200);
}