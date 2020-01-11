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

exports.addCustomer = function (req, res) {
    console.log("addCustomer: req", req.body);
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

            console.log("customer added")
            res.status(200).json({
                message: "Customer registered successfully"
            });
        });
}
