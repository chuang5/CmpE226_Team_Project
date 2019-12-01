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

// update due date of credit cards
connection.query('SELECT * FROM credit_card', function (err, results) {
    if (err) {
        console.log("error occurred", err);
        console.log(results)
    }
    for (i = 0; i < results.length; i++) {
        currentCard = results[i]
        // string to date()
        previousDue = new Date(currentCard.due_date)
        scheduledNewDue = new Date(previousDue.setMonth(previousDue.getMonth() + 1))
        today = new Date();
        if (today == scheduledNewDue) {
            newDue_date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
            connection.query('UPDATE credit_card SET due_date = ?, state_balance = ? WHERE card_num = ?',
                [newDue_date, currentCard.balance, currentCard.card_num], function (err, result) {
                    if (err) {
                        console.log("error occurred", err);
                    }
                    console.log('credit card %s info updated', currentCard.card_num)
                })
        }
    }
})


exports.payCreditCard = function (req, res) {
    console.log("payCreditCard: req", req.body);

    const transaction = {
        sender: req.body.sender, // checking account
        receiver: req.body.receiver, // credit card
        amount: req.body.amount
    }

    connection.query('SELECT * FROM checking WHERE account_num=?', [transaction.sender],
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                len = results.length;
                if(len==0) {
                    res.status(400).json({
                        failed: "sender account not exist"
                    })
                } else {
                        connection.query('SELECT * FROM credit_card WHERE card_num=?', [transaction.receiver],
                        function (error, results) {
                            if (error) {
                                console.log("error occurred", error);
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            } else {
                                len = results.length;
                                if(len==0) {
                                    res.status(400).json({
                                        failed: "receiver account not exist"
                                    })
                                } else {
                                        connection.query('CALL pay_credit_card(?, ?, ?, ?)', [transaction.sender, transaction.receiver, transaction.amount, new Date()],
                                        function (error, results) {
                                            if (error) {
                                                console.log("error occurred", error);
                                                res.status(400).json({
                                                    failed: "error occurred"
                                                })
                                            } else {
                                                res.status(200).json({
                                                    success: "Transaction successed"
                                                });
                                            }
                                        })
                                }
                            }
                    })
                }
            }
        })
}


exports.purchase = function (req, res) {
    console.log("purchase: req", req.body);

    const transaction = {
        sender: req.body.sender, 
        receiver: req.body.receiver, 
        amount: req.body.amount
    }

    connection.query('SELECT * FROM credit_card WHERE card_num=?', [transaction.sender],
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                len = results.length;
                if(len==0) {
                    res.status(400).json({
                        failed: "sender account not exist"
                    })
                } else {
                        connection.query('SELECT * FROM checking WHERE account_num=?', [transaction.receiver],
                        function (error, results) {
                            if (error) {
                                console.log("error occurred", error);
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            } else {
                                len = results.length;
                                if(len==0) {
                                    res.status(400).json({
                                        failed: "receiver account not exist"
                                    })
                                } else {
                                        connection.query('CALL purchase(?, ?, ?, ?)', [transaction.sender, transaction.receiver, transaction.amount, new Date()],
                                        function (error, results) {
                                            console.log(results)
                                            if (error) {
                                                console.log("error occurred", error);
                                                res.status(400).json({
                                                    failed: "error occurred"
                                                })
                                            } else {
                                                res.status(200).json({
                                                    success: "Transaction successed"
                                                });
                                            }
                                        })
                                }
                            }
                    })
                }
            }
        })
}


exports.toSaving = function (req, res) {
    console.log("toSaving: req", req.body);

    const transaction = {
        sender: req.body.sender, 
        receiver: req.body.receiver, 
        amount: req.body.amount
    }

    connection.query('SELECT * FROM checking WHERE account_num=?', [transaction.sender],
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                len = results.length;
                if(len==0) {
                    res.status(400).json({
                        failed: "sender account not exist"
                    })
                } else {
                        connection.query('SELECT * FROM saving WHERE account_num=?', [transaction.receiver],
                        function (error, results) {
                            if (error) {
                                console.log("error occurred", error);
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            } else {
                                len = results.length;
                                if(len==0) {
                                    res.status(400).json({
                                        failed: "receiver account not exist"
                                    })
                                } else {
                                        connection.query('CALL checking_to_saving(?, ?, ?, ?)', [transaction.sender, transaction.receiver, transaction.amount, new Date()],
                                        function (error, results) {
                                            if (error) {
                                                console.log("error occurred", error);
                                                res.status(400).json({
                                                    failed: "error occurred"
                                                })
                                            } else {
                                                res.status(200).json({
                                                    success: "Transaction successed"
                                                });
                                            }
                                        })
                                }
                            }
                    })
                }
            }
        })
}


exports.fromSaving = function (req, res) {
    console.log("fromSaving: req", req.body);

    const transaction = {
        sender: req.body.sender, 
        receiver: req.body.receiver, 
        amount: req.body.amount
    }

    connection.query('SELECT * FROM saving WHERE account_num=?', [transaction.sender],
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                len = results.length;
                if(len==0) {
                    res.status(400).json({
                        failed: "sender account not exist"
                    })
                } else {
                        connection.query('SELECT * FROM checking WHERE account_num=?', [transaction.receiver],
                        function (error, results) {
                            if (error) {
                                console.log("error occurred", error);
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            } else {
                                len = results.length;
                                if(len==0) {
                                    res.status(400).json({
                                        failed: "receiver account not exist"
                                    })
                                } else {
                                        connection.query('CALL saving_to_checking(?, ?, ?, ?)', [transaction.sender, transaction.receiver, transaction.amount, new Date()],
                                        function (error, results) {
                                            if (error) {
                                                console.log("error occurred", error);
                                                res.status(400).json({
                                                    failed: "error occurred"
                                                })
                                            } else {
                                                res.status(200).json({
                                                    success: "Transaction successed"
                                                });
                                            }
                                        })
                                }
                            }
                    })
                }
            }
        })
}


exports.frieness = function (req, res) {
    console.log("frieness: req", req.body);

    const transaction = {
        sender: req.body.sender, 
        receiver: req.body.receiver, 
        amount: req.body.amount,
        description: req.body.description
    }

    connection.query('SELECT * FROM checking WHERE account_num=?', [transaction.sender],
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                len = results.length;
                if(len==0) {
                    res.status(400).json({
                        failed: "sender account not exist"
                    })
                } else {
                        connection.query('SELECT * FROM checking WHERE account_num=?', [transaction.receiver],
                        function (error, results) {
                            if (error) {
                                console.log("error occurred", error);
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            } else {
                                len = results.length;
                                if(len==0) {
                                    res.status(400).json({
                                        failed: "receiver account not exist"
                                    })
                                } else {
                                        connection.query('CALL frieness(?, ?, ?, ?, ?)', [transaction.sender, transaction.receiver, transaction.amount, new Date(), transaction.description],
                                        function (error, results) {
                                            if (error) {
                                                console.log("error occurred", error);
                                                res.status(400).json({
                                                    failed: "error occurred"
                                                })
                                            } else {
                                                res.status(200).json({
                                                    success: "Transaction successed"
                                                });
                                            }
                                        })
                                }
                            }
                    })
                }
            }
        })
}
