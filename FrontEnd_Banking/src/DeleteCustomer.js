import React, {Component} from 'react';
import {Col} from "antd";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";

class DeleteCustomer extends Component {

    state = {
        account_no: ''
    }

    render() {
        return (
            <Col span={16}>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter account number"
                            floatingLabelText="Account Number"
                            onChange = {(event,newValue) => this.setState({account_no:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Delete" primary={true} style={style} onClick={(event) => this.handleClick.bind(this)(event)}/>
                    </div>
                </MuiThemeProvider>
            </Col>
        );
    }

    handleClick() {
        const apiBaseUrl = "http://localhost:5000/api/";
        console.log("values",this.state.account_no);
        let payload = {
            "account_no" : this.state.account_no
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