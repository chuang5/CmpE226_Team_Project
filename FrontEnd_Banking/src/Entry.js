import React, {Component} from 'react';
import App from "./App";
import Main from "./Main";
import CustomerDetail from "./CustomerDetail";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

class Entry extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/main" component={Main} />
                        <Route path="/customerDetail/:customer_id" component={CustomerDetail} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Entry;