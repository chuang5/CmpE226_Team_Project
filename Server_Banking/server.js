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
app.use(function(req, res, next) {
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
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ...");
    } else {
        console.log("Error connecting database ...");
    }
});

// connection.query('DROP TABLE IF EXISTS `customers`', function (err, result) {
//         if(err) {console.log("customers error: ", err.code)}
//         console.log("customers is dropped.")
// });

connection.query('CREATE TABLE customers(' +
    '`customer_id` INT NOT NULL AUTO_INCREMENT,' +
    '`username` VARCHAR(100) NOT NULL,' +
    '`name` VARCHAR(40) NOT NULL,' +
    '`ssn` VARCHAR(40) NOT NULL,' +
    '`phone` VARCHAR(40) NOT NULL,' +
    '`address` VARCHAR(40) NOT NULL,' +
    '`password` VARCHAR(40) NOT NULL,' +
    'PRIMARY KEY ( customer_id ));', function (err, result) {
        if(err) {
            console.log("Customers error: ", err.code)
        }
});

connection.query('CREATE TABLE employees(' +
    '`employee_id` INT NOT NULL AUTO_INCREMENT,' +
    '`username` VARCHAR(100) NOT NULL,' +
    '`name` VARCHAR(40) NOT NULL,' +
    '`ssn` VARCHAR(40) NOT NULL,' +
    '`phone` VARCHAR(40) NOT NULL,' +
    '`address` VARCHAR(40) NOT NULL,' +
    '`password` VARCHAR(40) NOT NULL,' +
    'PRIMARY KEY ( employee_id ));', function (err, result) {
        if(err) {
            console.log("Employees error: ", err.code)
        }
});

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
router.post('/addCustomer', addCustomer.addCustomer);
router.post('/deleteCustomer',deleteCustomer.deleteCustomer);
router.get('/getCustomersList', getCustomersList.getCustomersList);
//router.get('/login',login.login2);
app.use('/api', router);
app.set('view engine', 'ejs');
app.listen(5000);