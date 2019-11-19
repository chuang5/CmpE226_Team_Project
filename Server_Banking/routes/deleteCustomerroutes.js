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
    // console.log("req",req.body);
    const today = new Date();
    const account_no = req.body.account_no;

    connection.query('DELETE FROM customers WHERE account_no = ?',account_no, function (error, results, fields) {
        if (error) {
            console.log("error occurred",error);
            res.send({
                "code":400,
                "failed":"error occurred"
            })
        }else{
            console.log('The solution is: ', results);
            res.send({
                "code":200,
                "success":"customers deleted successfully"
            });
        }
    });
}