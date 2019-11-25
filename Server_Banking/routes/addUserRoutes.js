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

exports.addUser = function (req, res) {
    console.log("req", req.body);
    const newUser = {
        "username": req.body.username,
        "name": req.body.name,
        "ssn": req.body.ssn,
        "phone": req.body.phone,
        "address": req.body.address,
        "password": req.body.password,
        "role": req.body.role
    }
    if (newUser.role == 'Customer') {
        connection.query('SELECT username FROM customers;',
            function (error, results) {
                if (error) {
                    console.log("error occurred", error);
                    res.status(400).json({
                        "failed": "error occurred"
                    })
                } else {
                    UserExist = false;
                    for (i = 0; i < results.length; i++) {
                        if (results[i].username == newUser.username) {
                            UserExist = true;
                        };
                    }
                    if (!UserExist) {
                        connection.query('INSERT INTO customers (username, name, ssn, phone, address, password)' +
                            'VALUES (?, ?, ?, ?, ?, SHA1(?))',
                            [newUser.username, newUser.name, newUser.ssn, newUser.phone,
                            newUser.address, newUser.password],
                            function (error, results) {
                                if (error) { console.log("error occurred", error); }
                                console.log("customer added")
                            });
                        res.status(200).json({
                            "success": "Customer registered successfully"
                        });
                    } else {
                        res.status(200).json({
                            "success": "Customer is already exist"
                        });
                    }
                }
            });
    } else if (newUser.role == 'Employee') {
        connection.query('SELECT username FROM employees;',
            function (error, results) {
                if (error) {
                    console.log("error occurred", error);
                    res.status(400).json({
                        "failed": "error occurred"
                    })
                } else {
                    UserExist = false;
                    for (i = 0; i < results.length; i++) {
                        if (results[i].username == newUser.username) {
                            UserExist = true;
                        };
                    }
                    if (!UserExist) {
                        connection.query('INSERT INTO employees (username, name, ssn, phone, address, password)' +
                            'VALUES (?, ?, ?, ?, ?, SHA1(?))',
                            [newUser.username, newUser.name, newUser.ssn,
                            newUser.phone, newUser.address, newUser.password],
                            function (error, results) {
                                if (error) { console.log("error occurred", error); }
                                console.log("Employee added")
                            });
                        res.status(200).json({
                            "success": "Employee registered successfully"
                        });
                    } else {
                        res.status(200).json({
                            "success": "Employee is already exist"
                        });
                    }
                }
            });
    }else{
        res.status(400).json({
            "failed": "error occurred: No role detect"
        });
    }
}
