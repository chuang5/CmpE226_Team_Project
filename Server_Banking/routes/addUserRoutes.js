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

exports.signup = function (req, res) {
    console.log("req", req.body);
    const newUser = {
        "username": req.body.username,
        "name": req.body.name,
        "ssn": req.body.ssn,
        "phone": req.body.phone,
        "address": req.body.address,
        "password": req.body.password
    }
    connection.query('SELECT username FROM employees;',
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
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
                            // add to encryption table
                            connection.query('SELECT * FROM encryptpsw WHERE encryption=SHA1(?);',
                                [newUser.password], function (error, results) {
                                    if (error) { console.log("error occurred", error); }
                                    if (results.length == 0) {
                                        connection.query('INSERT INTO encrpytpsw (encryption, origin) VALUES (SHA1?, ?)',
                                            [newUser.password, newUser.password], function (error, results) {
                                                if (error) { console.log("error occurred", error); }
                                                console.log("encrypted paswword added")
                                            });
                                    }
                                })
                            console.log("Employee added")
                            res.status(200).json({
                                message: "Employee registered successfully"
                            });
                        });
                } else {
                    res.status(200).json({
                        message: "Employee is already exist"
                    });
                }
            }
        });
}

exports.addCustomer = function (req, res) {
    console.log("req", req.body);
    const newUser = {
        "name": req.body.name,
        "ssn": req.body.ssn,
        "phone": req.body.phone,
        "address": req.body.address,
        "agent": req.body.employee_id
    }
    connection.query('INSERT INTO customers (name, ssn, phone, address, agent_id)' +
        'VALUES (?, ?, ?, ?, ?)',
        [newUser.name, newUser.ssn, newUser.phone,
        newUser.address, newUser.agent],
        function (error, results) {
            if (error) { console.log("error occurred", error); }
            console.log("new customer ID:", results.insertId);
            // new user ID
            customer_id = results.insertId;

            // connection.query('INSERT INTO agent (customer_id, agent_id) VALUES (?, ?)',
            //     [customer_id, newUser.agent],
            //     function (error, results) {
            //         if (error) { console.log("error occurred", error); }
            //         console.log("agency added")
            //     });
            console.log("customer added")
            res.status(200).json({
                message: "Customer registered successfully"
            });
        });
}
