//SJSU CMPE 226 Fall 2019 TEAM4
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import axios from 'axios';
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            address:'',
            password:'',
            phone:'',
            ssn:''
        }
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
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
                            hintText="Enter your Address"
                            type="text"
                            floatingLabelText="Address"
                            onChange = {(event,newValue) => this.setState({address:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your SSN"
                            type="text"
                            floatingLabelText="SSN"
                            onChange = {(event,newValue) => this.setState({ssn:newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Phone Number"
                            type="text"
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
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event){
        var apiBaseUrl = "http://localhost:5000";
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
        //To be done:check for empty values before hitting submit
        let self = this;
        let payload = {
            "username": this.state.first_name,
            "name": this.state.last_name,
            "ssn": this.state.ssn,
            "phone": this.state.phone,
            "address": this.state.address,
            "password": this.state.password
        };
        axios.post(apiBaseUrl+'/Signup', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code === 200){
                    //  console.log("registration successfull");
                    let loginscreen=[];
                    loginscreen.push(<Login parentContext={this}/>);
                    let loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });
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



export default Register;