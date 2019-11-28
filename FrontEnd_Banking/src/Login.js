import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UploadScreen from './UploadScreen';
import Main from './Main';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({ username: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event) {
        let apiBaseUrl = "http://localhost:5000/";
        let self = this;
        let payload = {
            "username": this.state.username,
            "password": this.state.password
        };
        console.log(payload)
        axios.post(apiBaseUrl + 'login', payload)
            .then(function (response) {
                console.log(response)
                if (response.status === 200) {
                    if (response.data.message == "login successfully") {
                        localStorage.setItem('employee',response.data.data.employee_id);
                        console.log("Login successfully");
                        console.log(self.props);
                        self.props.appContext.props.history.push('/main');
                        // let uploadScreen = [];
                        // uploadScreen.push(<Main appContext={self.props.appContext}/>);
                        // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
                    } else if (response.data.message == "Password incorrect") {
                        console.log("Username password do not match");
                        alert("username password do not match")
                    } else if (response.data.message == "User doesn't exist") {
                        console.log("Username does not exists");
                        alert("Username does not exist");
                    }
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
export default Login;

