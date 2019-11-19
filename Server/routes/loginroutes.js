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

customers = {
    "username":"admin",
    "name":"admin",
    "ssn":"12345678",
    "phone":"0000000000",
    "address":"123 1st street",
    "password":"admin"
}

connection.query('SELECT username FROM customers;',
    function (error, results) {
        if (error) {console.log("error occurred",error);}
        UserExist = false;
        for(i = 0; i < results.length; i++){
            if(results[i].username == 'admin'){
                UserExist = true;
            };
        }
        if(!UserExist){
            connection.query('INSERT INTO customers SET ?',customers, function (error, results, fields) {
                if (error) {console.log("error occurred",error);}
                console.log("Customer added")
            });
        }
});

exports.register = function(req,res){
    // console.log("req",req.body);
    const today = new Date();
    const customers = {
        "username":req.body.username,
        "name":req.body.name,
        "ssn":req.body.ssn,
        "phone":req.body.phone,
        "address":req.body.address,
        "password":req.body.password
    }

    connection.query('INSERT INTO customers SET ?',customers, function (error, results, fields) {
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
                "success":"user registered successfully"
            });
        }
    });
}

exports.login = function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
            // console.log("error occurred",error);
            res.send({
                "code":400,
                "failed":"error occurred"
            })
        }else{
            // console.log('The solution is: ', results);
            if(results.length > 0){
                if(results[0].password === password){
                    res.send({
                        "code":200,
                        "success":"login successfully"
                    });
                }
                else{
                    res.send({
                        "code":204,
                        "success":"Email and password does not match"
                    });
                }
            }
            else{
                res.send({
                    "code":204,
                    "success":"Email does not exits"
                });
            }
        }
    });
}

// exports.login2 = (req, res) => {
//   res.redirect('back');
// };