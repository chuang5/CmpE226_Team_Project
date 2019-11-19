import React, {Component} from 'react';
import {Col, Row} from "antd";
import FilterTag from "./FilterTag";
import CustomerList from "./CustomerList";

class MyBusiness extends Component {

    render() {
        return (
            <Col span={16}>
                <Row>
                    <FilterTag />
                </Row>

                <Row>
                    <CustomerList />
                </Row>
            </Col>
        );
    }
}

export default MyBusiness;