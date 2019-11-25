const express = require('express');
const mysql = require('mysql');

const login = require('./routes/loginRoutes');
const addUser = require('./routes/addUserRoutes');
const addAccount = require('./routes/addAccountRoutes');
const getCustomersList = require('./routes/getCustomersList');
const deleteCustomer = require('./routes/deleteCustomerRoutes');
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

// test route
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/login', login.login);
router.post('/addUser', addUser.addUser);
router.post('/addCreditCard', addAccount.addCreditCard);
router.post('/deleteCustomer', deleteCustomer.deleteCustomer);
router.get('/getCustomersList', getCustomersList.getCustomersList);
app.use('/', router);
app.set('view engine', 'ejs');
app.listen(5000, () => {
    console.log('Server is running on port: 5000');
})


