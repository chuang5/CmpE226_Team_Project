const express = require('express');
const mysql = require('mysql');

const login = require('./routes/loginRoutes');
const addUser = require('./routes/addUserRoutes');
const addAccount = require('./routes/addAccountRoutes');
const updateAccount = require('./routes/updateAccountRoute');
const getCustomersList = require('./routes/getCustomersList');
const getCustomerInfo = require('./routes/getCustomerInfo');
const deleteCustomer = require('./routes/deleteCustomerRoutes');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
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

// test route
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/login', login.login);
router.post('/Signup', addUser.signup);
router.post('/addCustomer', addUser.addCustomer);
router.post('/addCreditCard', addAccount.addCreditCard);
router.post('/addSaving', addAccount.addSaving);
router.post('/addChecking', addAccount.addChecking);
router.put('/frieness', updateAccount.frieness);
router.put('/toSaving', updateAccount.toSaving);
router.put('/fromSaving', updateAccount.fromSaving);
router.put('/payCreditCard', updateAccount.payCreditCard);
router.put('/purchase', updateAccount.purchase);

router.post('/deleteCustomer', deleteCustomer.deleteCustomer);
router.post('/getCustomersList', getCustomersList.getCustomersList);
router.post('/getCustomerInfo', getCustomerInfo.getCustomerInfo);
router.post('/getCustomersAccounts', getCustomersList.getCustomersAccounts);
app.use('/', router);
app.set('view engine', 'ejs');
app.listen(5000, () => {
    console.log('Server is running on port: 5000');
})


