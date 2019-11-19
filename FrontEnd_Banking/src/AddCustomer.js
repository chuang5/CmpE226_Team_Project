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
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            account_no:''
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
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange = {(event,newValue) => this.setState({first_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange = {(event,newValue) => this.setState({last_name:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            type = "password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Account Number"
                            floatingLabelText="Account Number"
                            onChange = {(event,newValue) => this.setState({account_no:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick.bind(this)(event)}/>
                    </div>
                </MuiThemeProvider>
            </Col>
        );
    }

    handleClick(event){
        var apiBaseUrl = "http://localhost:5000/api/";
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password,this.state.account_no);
        //To be done:check for empty values before hitting submit
        let payload = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password,
            "account_no": this.state.account_no
        };
        const callback = this.props.onceAddCustomerSuccess;
        axios.post(apiBaseUrl+'/addCustomer', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code === 200){
                    console.log("add customer successfully");
                    //this.props.history.push('/main');
                    //{callback()}
                    alert("Customer added successfully!");
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