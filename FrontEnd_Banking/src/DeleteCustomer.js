import React, {Component} from 'react';
import {Col} from "antd";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";

class DeleteCustomer extends Component {

    state = {
        username: ''
    }

    render() {
        return (
            <Col span={16}>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter User Name"
                            floatingLabelText="User Name"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Delete" primary={true} style={style} onClick={(event) => this.handleClick.bind(this)(event)}/>
                    </div>
                </MuiThemeProvider>
            </Col>
        );
    }

    handleClick() {
        const apiBaseUrl = "http://localhost:5000";
        console.log("values",this.state.account_no);
        let payload = {
            "username" : this.state.username
        };
        const callback = this.props.onDeleteCustomerSuccess;
        axios.post(apiBaseUrl+'/deleteCustomer', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code === 200){
                    console.log("delete customer successfully");
                    //{callback()}
                    alert("Customer deleted successfully!");
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

export default DeleteCustomer;