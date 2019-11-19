import React from 'react';
import { Tag, Row} from 'antd';
import App from "./App";

class FilterTag extends React.Component {

    render() {
        return (
            <div>
                <h4 style={{ marginBottom: 16 }}>Filter:</h4>
                <div>
                    <Row>
                        <Tag color="magenta">checking account</Tag>
                        <Tag color="red">saving account</Tag>
                        <Tag color="volcano">credit card</Tag>
                    </Row>
                    <Row>
                        <Tag color="orange">orange</Tag>
                        <Tag color="gold">gold</Tag>
                        <Tag color="lime">lime</Tag>
                    </Row>
                    <Row>
                        <Tag color="green">green</Tag>
                        <Tag color="cyan">cyan</Tag>
                        <Tag color="blue">blue</Tag>
                    </Row>
                    <Row>
                        <Tag color="geekblue">geekblue</Tag>
                        <Tag color="purple">purple</Tag>
                    </Row>
                </div>
                <h4 style={{ margin: '16px 0' }}>Custom:</h4>
                <div>
                    <Tag color="#f50">#f50</Tag>
                    <Tag color="#2db7f5">#2db7f5</Tag>
                    <Tag color="#87d068">#87d068</Tag>
                    <Tag color="#108ee9">#108ee9</Tag>
                </div>
            </div>
        );
    }
}

export default FilterTag;