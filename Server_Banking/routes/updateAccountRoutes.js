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
        res.status(400).json({
            failed: "error occurred"
        })
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
    console.log("req", req.body);

    const payment = {
        sender: req.body.sender, // checking account
        receiver: req.body.receiver, // credit card
        amount: req.body.amount
    }

    connection.query('SELECT * FROM checking WHERE account_num=?', [payment.sender],
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                senderAccountInfo = results[0];
                if (senderAccountInfo.balance < payment.amount) {
                    res.status(400).json({
                        failed: "Balance is not enough"
                    });
                } else {
                    //if balance is enough, withdraw money from sender first
                    connection.query('UPDATE checking SET balance = ? WHERE account_num = ?',
                        [senderAccountInfo.balance - parseInt(payment.amount), payment.sender],
                        function (err, result) {
                            if (err) {
                                console.log(err)
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            } else {
                                // record txn in statement
                                connection.query('INSERT INTO checking_statement (user, user_account, partner_account,' +
                                    ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                    [senderAccountInfo.customer, senderAccountInfo.account_num, payment.receiver,
                                        'payment', payment.amount, new Date(), senderAccountInfo.balance - parseInt(payment.amount)],
                                    function (err, result) {
                                        if (err) {
                                            console.log(err)
                                            res.status(400).json({
                                                failed: "error occurred"
                                            })
                                        } else {
                                            console.log('checking statment, sender/user %d updated', senderAccountInfo.customer)
                                        }
                                    });
                                // put money into receiver
                                connection.query('SELECT * FROM credit_card WHERE card_num=?'
                                    , [payment.receiver],
                                    function (err, result) {
                                        if (err) {
                                            console.log(err)
                                            res.status(400).json({
                                                failed: "error occurred"
                                            })
                                        } else {
                                            receiverAccountInfo = result[0];
                                            connection.query('UPDATE credit_card SET balance = ? WHERE card_num = ?',
                                                [receiverAccountInfo.balance - parseInt(payment.amount), payment.receiver],
                                                function (err, result) {
                                                    if (err) { console.log(err) }
                                                });
                                            connection.query('INSERT INTO credit_statement (user, user_account, partner_account,' +
                                                ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                                [receiverAccountInfo.customer, receiverAccountInfo.card_num, payment.sender,
                                                    'payment', payment.amount, new Date(), receiverAccountInfo.balance - parseInt(payment.amount)],
                                                function (err, result) {
                                                    if (err) {
                                                        console.log(err)
                                                        res.status(400).json({
                                                            failed: "error occurred"
                                                        })
                                                    } else {
                                                        console.log('payment statment, receiver/user %d updated', receiverAccountInfo.customer)
                                                    }
                                                });
                                        }
                                    })
                            }
                        });
                }
                res.status(200).json({
                    success: "Payment successed"
                });
            }
        });
}

exports.purchase = function (req, res) {
    console.log("req", req.body);

    const payment = {
        sender: req.body.sender, // credir card
        receiver: req.body.receiver, // checking account
        amount: req.body.amount
    }

    connection.query('SELECT * FROM credit_card WHERE card_num=?', [payment.sender],
        function (error, results) {
            if (error) {
                console.log("error occurred", error);
                res.status(400).json({
                    failed: "error occurred"
                })
            } else {
                senderAccountInfo = results[0];
                connection.query('UPDATE credit_card SET balance = ? WHERE card_num = ?',
                    [senderAccountInfo.balance + parseInt(payment.amount), payment.sender],
                    function (err, result) {
                        if (err) {
                            console.log(err)
                            res.status(400).json({
                                failed: "error occurred"
                            })
                        } else {
                            // record txn in statement
                            connection.query('INSERT INTO credit_statement (user, user_account, partner_account,' +
                                ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                [senderAccountInfo.customer, senderAccountInfo.card_num, payment.receiver,
                                    'purchase', payment.amount, new Date(), senderAccountInfo.balance + parseInt(payment.amount)],
                                function (err, result) {
                                    if (err) {
                                        console.log(err)
                                        res.status(400).json({
                                            failed: "error occurred"
                                        })
                                    } else {
                                        console.log('credit statment, sender/user %d updated', senderAccountInfo.customer)
                                    }
                                });
                            // put money into receiver
                            connection.query('SELECT * FROM checking WHERE account_num=?'
                                , [payment.receiver],
                                function (err, result) {
                                    if (err) {
                                        console.log(err)
                                        res.status(400).json({
                                            failed: "error occurred"
                                        })
                                    } else {
                                        receiverAccountInfo = result[0];
                                        connection.query('UPDATE checking SET balance = ? WHERE account_num = ?',
                                            [receiverAccountInfo.balance + parseInt(payment.amount), payment.receiver],
                                            function (err, result) {
                                                if (err) { console.log(err) }
                                            });
                                        connection.query('INSERT INTO checking_statement (user, user_account, partner_account,' +
                                            ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                            [receiverAccountInfo.customer, receiverAccountInfo.account_num, payment.sender,
                                                'receive', payment.amount, new Date(), receiverAccountInfo.balance + parseInt(payment.amount)],
                                            function (err, result) {
                                                if (err) {
                                                    console.log(err)
                                                    res.status(400).json({
                                                        failed: "error occurred"
                                                    })
                                                } else {
                                                    console.log('payment statment, receiver/user %d updated', receiverAccountInfo.customer)
                                                }
                                            });
                                    }
                                })
                        }
                        res.status(200).json({
                            success: "purchase transaction successed"
                        });
                    });
            }
        });
}

exports.toSaving = function (req, res) {
    console.log("req", req.body);

    const transaction = {
        sender: req.body.sender, // checking account
        receiver: req.body.receiver, // saving account
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
                senderAccountInfo = results[0];
                if (senderAccountInfo.balance < transaction.amount) {
                    res.status(400).json({
                        failed: "Balance is not enough"
                    });
                } else {
                    //if balance is enough, withdraw money from sender first
                    connection.query('UPDATE checking SET balance = ? WHERE account_num = ?',
                        [senderAccountInfo.balance - parseInt(transaction.amount), transaction.sender],
                        function (err, result) {
                            if (err) {
                                console.log(err)
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            } else {
                                // record txn in statement
                                connection.query('INSERT INTO checking_statement (user, user_account, partner_account,' +
                                    ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                    [senderAccountInfo.customer, senderAccountInfo.account_num, transaction.receiver,
                                        'withdraw', transaction.amount, new Date(), senderAccountInfo.balance - parseInt(transaction.amount)],
                                    function (err, result) {
                                        if (err) {
                                            console.log(err)
                                            res.status(400).json({
                                                failed: "error occurred"
                                            })
                                        } else {
                                            console.log('checking statment, sender/user %d updated', senderAccountInfo.customer)
                                        }
                                    });
                                // put money into receiver
                                connection.query('SELECT * FROM saving WHERE account_num=?'
                                    , [transaction.receiver],
                                    function (err, result) {
                                        if (err) {
                                            console.log(err)
                                            res.status(400).json({
                                                failed: "error occurred"
                                            })
                                        } else {
                                            receiverAccountInfo = result[0];
                                            connection.query('UPDATE saving SET balance = ? WHERE account_num = ?',
                                                [receiverAccountInfo.balance + parseInt(transaction.amount), transaction.receiver],
                                                function (err, result) {
                                                    if (err) { console.log(err) }
                                                });
                                            connection.query('INSERT INTO saving_statement (user, user_account, partner_account,' +
                                                ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                                [receiverAccountInfo.customer, receiverAccountInfo.account_num, transaction.sender,
                                                    'deposite', transaction.amount, new Date(), receiverAccountInfo.balance + parseInt(transaction.amount)],
                                                function (err, result) {
                                                    if (err) {
                                                        console.log(err)
                                                        res.status(400).json({
                                                            failed: "error occurred"
                                                        })
                                                    } else {
                                                        console.log('saving statment, receiver/user %d updated', receiverAccountInfo.customer)
                                                    }
                                                });
                                        }
                                    })
                            }
                        });
                }
                res.status(200).json({
                    success: "Transaction successed"
                });
            }
        });
}

exports.fromSaving = function (req, res) {
    console.log("req", req.body);

    const transaction = {
        sender: req.body.sender, // saving account
        receiver: req.body.receiver, // checking account
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
                senderAccountInfo = results[0];
                if (senderAccountInfo.balance < transaction.amount) {
                    res.status(400).json({
                        failed: "Balance is not enough"
                    });
                } else {
                    //if balance is enough, withdraw money from sender first
                    connection.query('UPDATE saving SET balance = ? WHERE account_num = ?',
                        [senderAccountInfo.balance - parseInt(transaction.amount), transaction.sender],
                        function (err, result) {
                            if (err) {
                                console.log(err)
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            } else {
                                // record txn in statement
                                connection.query('INSERT INTO saving_statement (user, user_account, partner_account,' +
                                    ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                    [senderAccountInfo.customer, senderAccountInfo.account_num, transaction.receiver,
                                        'withdraw', transaction.amount, new Date(), senderAccountInfo.balance - parseInt(transaction.amount)],
                                    function (err, result) {
                                        if (err) {
                                            console.log(err)
                                            res.status(400).json({
                                                failed: "error occurred"
                                            })
                                        } else {
                                            console.log('saving statment, sender/user %d updated', senderAccountInfo.customer)
                                        }
                                    });
                                // put money into receiver
                                connection.query('SELECT * FROM checking WHERE account_num=?'
                                    , [transaction.receiver],
                                    function (err, result) {
                                        if (err) {
                                            console.log(err)
                                            res.status(400).json({
                                                failed: "error occurred"
                                            })
                                        } else {
                                            receiverAccountInfo = result[0];
                                            connection.query('UPDATE checking SET balance = ? WHERE account_num = ?',
                                                [receiverAccountInfo.balance + parseInt(transaction.amount), transaction.receiver],
                                                function (err, result) {
                                                    if (err) { console.log(err) }
                                                });

                                            connection.query('INSERT INTO checking_statement (user, user_account, partner_account,' +
                                                ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                                [receiverAccountInfo.customer, receiverAccountInfo.account_num, transaction.sender,
                                                    'deposite', transaction.amount, new Date(), receiverAccountInfo.balance + parseInt(transaction.amount)],
                                                function (err, result) {
                                                    if (err) {
                                                        console.log(err)
                                                        res.status(400).json({
                                                            failed: "error occurred"
                                                        })
                                                    } else {
                                                        console.log('checking statment, receiver/user %d updated', receiverAccountInfo.customer)
                                                    }
                                                });
                                        }
                                    })
                            }
                        });
                }
                res.status(200).json({
                    success: "Transaction successed"
                });
            }
        });
}

exports.frieness = function (req, res) {
    console.log("req", req.body);

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
                senderAccountInfo = results[0];
                if (senderAccountInfo.balance < transaction.amount) {
                    res.status(400).json({
                        failed: "Balance is not enough"
                    });
                } else {
                    //if balance is enough, withdraw money from sender first
                    connection.query('UPDATE checking SET balance = ? WHERE account_num = ?',
                        [senderAccountInfo.balance - parseInt(transaction.amount), transaction.sender],
                        function (err, result) {
                            if (err) {
                                console.log(err)
                                res.status(400).json({
                                    failed: "error occurred"
                                })
                            } else {
                                // record txn in statement
                                connection.query('INSERT INTO checking_statement (user, user_account, partner_account,' +
                                    ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                    [senderAccountInfo.customer, senderAccountInfo.account_num, transaction.receiver,
                                        'transfer', transaction.amount, new Date(), senderAccountInfo.balance - parseInt(transaction.amount)],
                                    function (err, result) {
                                        if (err) {
                                            console.log(err)
                                            res.status(400).json({
                                                failed: "error occurred"
                                            })
                                        } else {
                                            console.log('checking statment, sender/user %d updated', senderAccountInfo.customer)
                                        }
                                    });
                                // put money into receiver
                                connection.query('SELECT * FROM checking WHERE account_num=?'
                                    , [transaction.receiver],
                                    function (err, result) {
                                        if (err) {
                                            console.log(err)
                                            res.status(400).json({
                                                failed: "error occurred"
                                            })
                                        } else {
                                            receiverAccountInfo = result[0];
                                            connection.query('UPDATE checking SET balance = ? WHERE account_num = ?',
                                                [receiverAccountInfo.balance + parseInt(transaction.amount), transaction.receiver],
                                                function (err, result) {
                                                    if (err) { console.log(err) }
                                                });

                                            connection.query('INSERT INTO checking_statement (user, user_account, partner_account,' +
                                                ' category, amount, date, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
                                                [receiverAccountInfo.customer, receiverAccountInfo.account_num, transaction.sender,
                                                    'transfer', transaction.amount, new Date(), receiverAccountInfo.balance + parseInt(transaction.amount)],
                                                function (err, result) {
                                                    if (err) {
                                                        console.log(err)
                                                        res.status(400).json({
                                                            failed: "error occurred"
                                                        })
                                                    } else {
                                                        console.log('checking statment, receiver/user %d updated', receiverAccountInfo.customer)
                                                    }
                                                });

                                            // insert in frieness
                                            connection.query('INSERT INTO frieness (sender, receiver, amount, description) VALUES (?, ?, ?, ?)',
                                                [transaction.sender, transaction.receiver, transaction.amount, transaction.description],
                                                function (error, results) {
                                                    if (error) {
                                                        console.log("error occurred", error);
                                                        res.status(400).json({
                                                            failed: "error occurred"
                                                        })
                                                    }
                                                });
                                        }
                                    })
                            }
                        });

                }
                res.status(200).json({
                    success: "Transaction successed"
                });
            }
        });
}
