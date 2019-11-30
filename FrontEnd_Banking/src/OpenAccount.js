import React, {Component} from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {Col, Radio} from "antd";
import axios from "axios";

class OpenAccount extends Component {

    constructor(props){
        super(props);
        this.state={
            customer_id:'',
            balance:0,
            account_type:1
        }
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            account_type: e.target.value,
        });
    };


    render() {
        return (
            <Col span={16}>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter User ID"
                            floatingLabelText="User ID"
                            onChange = {(event,newValue) => this.setState({customer_id:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter Balence"
                            floatingLabelText="Balence"
                            onChange = {(event,newValue) => this.setState({balance:parseInt(newValue)})}
                        />
                        <br/>
                        <br/>
                        <Radio.Group onChange={this.onChange} value={this.state.account_type}>
                            <Radio value={1}>Checking Account</Radio>
                            <Radio value={2}>Saving Account</Radio>
                            <Radio value={3}>Credit Card</Radio>
                        </Radio.Group>
                        <br/>
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
            "customer_id": this.state.customer_id,
            "balance": this.state.balance,
        };
        console.log(payload);
        //const callback = this.props.onceAddCustomerSuccess;
        let finalUrl;
        switch (this.state.account_type) {
            case 1:
                finalUrl = apiBaseUrl + '/addChecking';
                break;
            case 2:
                finalUrl = apiBaseUrl + '/addSaving';
                break;
            case 3:
                finalUrl = apiBaseUrl + '/addCreditCard';
                break;
        }
        axios.post(finalUrl, payload)
            .then(function (response) {
                console.log(response);
                if(response.data.message === "Checking applied successfully"){
                    console.log("Added checking account successfully");
                    alert("Added checking account successfully");
                } else if (response.data.message === "Saving applied successfully") {
                    console.log("Added saving account successfully");
                    alert("Added saving account successfully");
                } else if (response.data.message == "This user already had a saving account") {
                    console.log("This user already had a saving account");
                    alert("This user already had a saving account");
                } else if (response.data.message == "This user already had a checking account") {
                    console.log("This user already had a checking account");
                    alert("This user already had a checking account");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

}
const style = {
    margin: 15,
};
export default OpenAccount;