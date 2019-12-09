//SJSU CMPE 226 Fall 2019 TEAM4
import React from 'react';
import axios from 'axios';
import { List, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';
import { Menu, Dropdown, Button, Icon } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';
const fakeDataUrl = 'http://localhost:5000/getCustomersList';

class CustomerList extends React.Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
    };

    componentDidMount() {
        let payload = {
            "employee_id": localStorage.getItem("employee")
        };
        axios.post(fakeDataUrl, payload)
            .then((response) => {
                console.log(response.data);

                this.setState({
                    data: response.data.customersList
                });

            });

    }

    handleInfiniteOnLoad = () => {
        let { data } = this.state;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            message.warning('Infinite List loaded all');
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            console.log(res)
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    handleMenuClick = (customerid, employeeid, name) => {
        //message.info('Deleting Customer: ' + customerid);
        console.log('click', customerid, employeeid, name);

        const apiBaseUrl = "http://localhost:5000";
        console.log("values",customerid);
        let payload = {
            "customer_id" : customerid,
            "employee_id" : employeeid,
            "name": name
        };
        axios.post(apiBaseUrl+'/deleteCustomer', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.message == "Customer delete successfully"){
                    console.log("delete customer successfully");
                    //{callback()}
                    alert("Customer deleted successfully!");
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    render() {
        const menu = (customerid, employeeid, name) => (
            <Menu onClick={this.handleMenuClick.bind(this, customerid, employeeid, name)}>
                <Menu.Item key="1">
                    <Icon type="user" />
                    Delete Customer
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="demo-infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    <List
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={<a href={'/customerDetail/' + item.customer_id}>{item.agent_id == localStorage.getItem("employee") ? "***" + item.name : item.name}</a>}
                                    description={item.ssn}
                                />
                                <div>{item.phone}</div>
                                <div>
                                    <Dropdown overlay={menu(item.customer_id, item.employee_id, item.name)} customerId={item.customer_id}>
                                        <Button>
                                            Action <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </div>
                            </List.Item>
                        )}
                    >
                        {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                        )}
                    </List>
                </InfiniteScroll>
            </div>
        );
    }
}

export default CustomerList;