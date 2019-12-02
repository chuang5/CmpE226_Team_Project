//SJSU CMPE 226 Fall 2019 TEAM4
import React, {Component} from 'react';
import {Col} from "antd";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";

class DeleteCustomer extends Component {

    state = {
        customer_id:0
    }

    render() {
        return (
            <Col span={16}>
                <MuiThemeProvider>
                    <div>
                        <TextField
                            hintText="Enter Customer ID"
                            floatingLabelText="Customer ID"
                            onChange = {(event,newValue) => this.setState({customer_id:newValue})}
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
        console.log("values",this.state.customer_id);
        let payload = {
            "customer_id" : this.state.customer_id
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