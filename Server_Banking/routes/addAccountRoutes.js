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

exports.addCreditCard = function (req, res) {
    console.log("addCreditCard: req", req.body);
    // only Visa card: 4###-####-####-####, random generate
    card_num = parseInt(Math.random() * 1E15 + 4000000000000000).toString();

    d1 = new Date();
    d1.setYear(d1.getFullYear() + 5);
    console.log(d1.getMonth() + 1, d1.getFullYear());
    exp = d1.getMonth() + 1 + "/" + d1.getFullYear();

    d2 = new Date();
    d2.setMonth(d2.getMonth() + 1);
    due_date = (d2.getMonth() + 1) + '/' + d2.getDate() + '/' + d2.getFullYear();

    const newCard = {
        card_num: card_num,
        customer: req.body.customer_id,
        due_date: due_date,
        state_balance: 0,
        balance: 0,
        exp: exp,

    }
    console.log(newCard.customer)

    connection.query('INSERT INTO credit_card (card_num, customer,' +
        ' due_date, state_balance, balance, exp) VALUES (?, ?, ?, ?, ?, ?)',
        [newCard.card_num, newCard.customer, newCard.due_date,
        newCard.state_balance, newCard.balance, newCard.exp],
        function (error, results) {
            if (error) { console.log("error occurred", error); }
            console.log("card added")
            connection.query('INSERT INTO user_accounts (customer, type, ' +
                'account_num) VALUES (?, ?, ?)',
                [newCard.customer, 'credit', newCard.card_num],
                function (error, results) {
                    if (error) { console.log("error occurred", error); }
                    console.log("user_accounts added")
                    res.status(200).json({
                        success: "Credit card applied successfully"
                    });
                });
        });
}

exports.addSaving = function (req, res) {
    console.log("addSaving: req", req.body);
    account_num = parseInt(Math.random() * 1E16).toString();

    const newSaving = {
        account_num: account_num,
        customer: req.body.customer_id,
        balance: req.body.balance
    }

    connection.query('INSERT INTO saving (account_num, customer, balance) VALUES (?, ?, ?)',
        [newSaving.account_num, newSaving.customer, newSaving.balance],
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                connection.query('INSERT INTO user_accounts (account_num, type, customer)' +
                    'VALUES (?, ?, ?)',
                    [newSaving.account_num, 'saving', newSaving.customer],
                    function (error, results) {
                        if (error) { console.log("error occurred", error); }
                        console.log("user_accounts added")
                        res.status(200).json({
                            success: "Saving applied successfully"
                        });
                    });
            }
        });
}

exports.addChecking = function (req, res) {
    console.log("addChecking: req", req.body);
    account_num = parseInt(Math.random() * 1E16).toString();

    const newChecking = {
        account_num: account_num,
        customer: req.body.customer_id,
        balance: req.body.balance
    }

    connection.query('INSERT INTO checking (account_num, customer, balance) VALUES (?, ?, ?)',
        [newChecking.account_num, newChecking.customer, newChecking.balance],
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                connection.query('INSERT INTO user_accounts (account_num, type, customer)' +
                    'VALUES (?, ?, ?)',
                    [newChecking.account_num, 'checking', newChecking.customer],
                    function (error, results) {
                        if (error) { console.log("error occurred", error); }
                        console.log("user_accounts added")
                        res.status(200).json({
                            success: "Checking applied successfully"
                        });
                    });
            }
        });
}
