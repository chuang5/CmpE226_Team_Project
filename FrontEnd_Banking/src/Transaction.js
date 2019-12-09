//SJSU CMPE 226 Fall 2019 TEAM4
import React, {Component} from 'react';
import {Col, Input, Tag, Row, Checkbox, message, Select} from "antd";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";

class Transaction extends Component {

    constructor(props){
        super(props);
        this.state={
            sender:'',
            receiver:'',
            sender_type:'',
            receiver_type:'',
            amount:0,
            isFrieness: false,
            description:'',
            transaction_type:1
        }
    }

    onChange = e => {
        console.log('This is Frieness Transaction');
        this.setState({
            isFrieness: !this.state.isFrieness,
        });
    };

    handleChange(actor, value) {
        console.log("this is " + actor);
        console.log(`selected ${value}`);

        if (actor === "sender") {
            this.setState(
                {sender_type: value}
            );
        } else if (actor === "receiver") {
            this.setState(
                {receiver_type: value}
            );
        }

    }

    handleMenuClick(e)  {
        message.info('Actor is' + e);
        console.log('click' + e);

        // const apiBaseUrl = "http://localhost:5000";
        // console.log("values");
        // let payload = {
        //     "customer_id" : 0
        // };
        // axios.post(apiBaseUrl+'/deleteCustomer', payload)
        //     .then(function (response) {
        //         console.log(response);
        //         if(response.data.code === 200){
        //             console.log("delete customer successfully");
        //             //{callback()}
        //             alert("Customer deleted successfully!");
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    };



    render() {

        const { Option } = Select;

        return (
            <Col span={16}>
                <MuiThemeProvider>
                    <div>
                        <div>
                            <Row>
                                <Tag color="green">From</Tag>
                                <Row>
                                    <TextField
                                        hintText="Account Number"
                                        floatingLabelText="Enter Sender Account"
                                        onChange = {(event,newValue) => this.setState({sender:newValue})}
                                    />
                                    <Select defaultValue="Account Type" style={{ width: 130 }} onChange={this.handleChange.bind(this,"sender")}>
                                        <Option value="saving">Saving</Option>
                                        <Option value="checking">Checking</Option>
                                        <Option value="credit">
                                            Credit card
                                        </Option>
                                    </Select>
                                </Row>
                            </Row>
                            <br/>
                            <br/>
                            <Row>
                                <Tag color="blue">To</Tag>
                                <Row>
                                    <TextField
                                        hintText="Account Number"
                                        floatingLabelText="Enter Receiver Account"
                                        onChange = {(event,newValue) => this.setState({receiver:newValue})}
                                        // onChange = {(event,newValue) => this.setState({receiver:parseInt(newValue)})}
                                    />
                                    <Select defaultValue="Account Type" style={{ width: 130 }} onChange={this.handleChange.bind(this,"receiver")}>
                                        <Option value="saving">Saving</Option>
                                        <Option value="checking">Checking</Option>
                                        <Option value="credit">
                                            Credit card
                                        </Option>
                                    </Select>
                                </Row>
                            </Row>
                            <br/>
                            <br/>
                            <Row>
                                <Tag color="orange">Amount</Tag>
                                <Row>
                                    <TextField
                                        hintText="Amount"
                                        floatingLabelText="Enter Amount"
                                        onChange = {(event,newValue) => this.setState({amount:parseInt(newValue)})}
                                    />
                                </Row>
                            </Row>

                        </div>
                        <br/>
                        <br/>
                        <Checkbox onChange={this.onChange}>This is Frieness Transaction</Checkbox>
                        <br/>
                        <br/>
                        {this.state.isFrieness && 
                            <TextField 
                                hintText="Description"
                                floatingLabelText="Enter Description"
                                onChange = {(event,newValue) => this.setState({description:newValue})}/>}
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick.bind(this)(event)}/>
                    </div>
                </MuiThemeProvider>
            </Col>
        );
    }

    handleClick(event){
        var apiBaseUrl = "http://localhost:5000";
        //To be done:check for empty values before hitting submit
        let payload = {
            "sender": this.state.sender,
            "receiver": this.state.receiver,
            "amount": this.state.amount,
            "description": this.state.description
        };
        console.log(payload);
        //const callback = this.props.onceAddCustomerSuccess;
        let finalUrl;
        if (this.state.isFrieness) {
            finalUrl = apiBaseUrl + '/frieness';
        } else {
            if (this.state.sender_type === 'checking') {
                if (this.state.receiver_type === 'saving') {
                    finalUrl = apiBaseUrl + '/toSaving';
                } else if (this.state.receiver_type === 'credit') {
                    finalUrl = apiBaseUrl + '/payCreditCard';
                }
            } else if (this.state.receiver_type === 'checking') {
                if (this.state.sender_type === 'saving') {
                    finalUrl = apiBaseUrl + '/fromSaving';
                } else if (this.state.sender_type === 'credit') {
                    finalUrl = apiBaseUrl + '/purchase';
                }
            }
        }

        axios.put(finalUrl, payload)
            .then(function (response) {
                console.log(response);
                alert(response.data.success);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}

const style = {
    margin: 15,
};

export default Transaction;