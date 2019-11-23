const express = require('express');
const mysql = require('mysql');

const login = require('./routes/loginroutes');
const addCustomer = require('./routes/addCustomerroutes');
const getCustomersList = require('./routes/getCustomersList');
const deleteCustomer = require('./routes/deleteCustomerroutes');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const router = express.Router();

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
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ...");
    } else {
        console.log("Error connecting database ...");
    }
});

// employee = {
//     "username": "adminE",
//     "name": "adminE",
//     "ssn": "12345678",
//     "phone": "0000000000",
//     "address": "123 1st street",
//     "password": 'adminE'
// }

// connection.query('INSERT INTO employees (username, name, ssn, phone, address, password)' +
//     'VALUES (?, ?, ?, ?, ?, SHA1(?))',
//     [employee.username, employee.name, employee.ssn, employee.phone, employee.address,
//          employee.password],
//         function (error, results) {
//             if (error) { console.log("error occurred", error); }
//             console.log("employee added")
//         });

// test route
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login);
router.post('/addCustomer', addCustomer.addCustomer);
router.post('/deleteCustomer', deleteCustomer.deleteCustomer);
router.get('/getCustomersList', getCustomersList.getCustomersList);
//router.get('/login',login.login2);
app.use('/api', router);
app.set('view engine', 'ejs');
app.listen(5000);