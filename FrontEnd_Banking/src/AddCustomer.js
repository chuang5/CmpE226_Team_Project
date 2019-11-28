import React, {Component} from 'react';
import {Col} from 'antd';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import Login from "./Login";

class AddCustomer extends Component {
    constructor(props){
        super(props);
        this.state={
            user_name:'',
            name:'',
            ssn:'',
            phone:'',
            address:'',
            password:''
        }
    }

    render() {
        return (
            <Col span={16}>
                <MuiThemeProvider>
                    <div>
                        {/*<AppBar*/}
                        {/*    title="Open Account"*/}
                        {/*/>*/}
                        <TextField
                            hintText="Enter your User Name"
                            floatingLabelText="User Name"
                            onChange = {(event,newValue) => this.setState({user_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Name"
                            floatingLabelText="Name"
                            onChange = {(event,newValue) => this.setState({name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your SSN"
                            //type="email"
                            floatingLabelText="SSN"
                            onChange = {(event,newValue) => this.setState({ssn:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Address"
                            //type="email"
                            floatingLabelText="Address"
                            onChange = {(event,newValue) => this.setState({address:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Phone Number"
                            floatingLabelText="Phone Number"
                            onChange = {(event,newValue) => this.setState({phone:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
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
            "username": this.state.user_name,
            "name": this.state.name,
            "ssn": this.state.ssn,
            "phone": this.state.phone,
            "address": this.state.address,
            "password": this.state.password,
            "agentId": localStorage.getItem("employee"),
        };
        console.log(payload);
        const callback = this.props.onceAddCustomerSuccess;
        axios.post(apiBaseUrl+'/addCustomer', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.message === "Customer registered successfully"){
                    console.log("add customer successfully");
                    //this.props.history.push('/main');
                    //{callback()}
                    alert("Customer added successfully!");
                } else if (response.data.message === "Customer is already exist") {
                    console.log("Customer is already exist");
                    alert("Customer is already exist");
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
export default AddCustomer;