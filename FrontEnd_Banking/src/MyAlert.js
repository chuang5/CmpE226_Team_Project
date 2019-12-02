//SJSU CMPE 226 Fall 2019 TEAM4
import React, {Component} from 'react';
import {Alert, Col} from 'antd';


class MyAlert extends Component {


    render() {
        return (
            <Col span={16}>
                <Alert
                    message="Success Tips"
                    description="Action operated successfully."
                    type="success"
                    showIcon
                />
            </Col>
        );
    }
}

export default MyAlert;