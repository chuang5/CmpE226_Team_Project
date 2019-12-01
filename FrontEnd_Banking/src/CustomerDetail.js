import React, {Component} from 'react';
import axios from "axios";
import View1 from "./customerdetail/views/View1";
import View2 from "./customerdetail/views/View2";
import View3 from "./customerdetail/views/View3";
import {Layout, Tag, Table} from "antd";
import View4 from "./customerdetail/views/View4";
import View5 from "./customerdetail/views/View5";
import View6 from "./customerdetail/views/View6";
import data from "./customerdetail/data";
const { Sider, Content, Footer } = Layout;

const fakeDataUrl = 'http://localhost:5000/getCustomerInfo';

class CustomerDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedUser: {},
            data:[],
            transactionData: []
        }
    }

    componentDidMount() {

        let payload = {
            "customer_id": this.props.match.params.customer_id
        };
        axios.post(fakeDataUrl, payload)
            .then((response) => {
                console.log(response.data.customerInfo[8]);
                let item1 = {
                    key: '1',
                    type: 'Checking',
                    balance: (response.data.customerInfo[6].checking_accounts.length == 0 ? 0 : response.data.customerInfo[6].checking_accounts[0].balance),
                    tags: ['Checking']
                };

                let item2 = {
                    key: '2',
                    type: 'Saving',
                    balance: (response.data.customerInfo[7].saving_accounts.length == 0 ? 0 : response.data.customerInfo[7].saving_accounts[0].balance),
                    tags: ['Saving']
                };

                let item3 = {
                    key: '3',
                    type: 'Credit Card',
                    balance: (response.data.customerInfo[8].credit_cards.length == 0 ? 0 : response.data.customerInfo[8].credit_cards[0].balance),
                    tags: ['Credit Card']
                };
                let temData = [];
                let tempTransactionDataList = [];
                this.appendTransactionRecord(response.data.customerInfo, tempTransactionDataList);

                temData.push(item1, item2, item3);
                console.log(temData);
                this.setState(
                    {
                            data: temData,
                            selectedUser: response.data.customerInfo[0].info[0],
                            transactionData: tempTransactionDataList
                    }
                );
            });

    }

    appendTransactionRecord = (item, list) => {
        let key = 1;
        let checkingStatements = item[2].checking_statement;
        let savingStatements = item[3].saving_statement;
        //let credit

        checkingStatements.map(checkingStatement => {
            list.push(
                {
                    key: key++,
                    tags: ['Checking'],
                    from: checkingStatement.user_account,
                    to: checkingStatement.partner_account,
                    amount: checkingStatement.amount,
                    category: checkingStatement.category,
                    date: checkingStatement.date
                }
            );
        });

        savingStatements.map(savingStatement => {
            list.push(
                {
                    key: key++,
                    tags: ['Saving'],
                    from: savingStatement.user_account,
                    to: savingStatement.partner_account,
                    amount: savingStatement.amount,
                    category: savingStatement.category,
                    date: savingStatement.date
                }
            );
        });

    };

    render() {

        //console.log(this.props.match.params.customer_id);
        const {selectedUser} = this.state;

        const columns = [
            {
                title: 'Account Type',
                dataIndex: 'type',
                key: 'type',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Balance',
                dataIndex: 'balance',
                key: 'balance',
            },
            {
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                        </span>
                ),
            }
        ];

        const colum2 = [
            {
                title: "Tags",
                dataIndex: "tags",
                key: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                        </span>
                ),
            },
            {
                title: 'From',
                dataIndex: 'from',
                key: 'from'
            },
            {
                title: 'To',
                dataIndex: 'to',
                key: 'to'
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount'
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category'
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date'
            },
        ];

        return (
            <div>
                <Layout style={{ height: 920 }}>
                    <Sider width={300} style={{backgroundColor:'#eee'}}>
                        <Content style={{ height: 200 }}>
                            <View1 user={selectedUser}/>
                        </Content>
                        <Content style={{ height: 300 }}>

                        </Content>
                        {/*<Content style={{ height: 400 }}>*/}
                        {/*    <View3*/}
                        {/*        changeGreaterThenAge={this.changeGreaterThenAge}*/}
                        {/*        changeIncludedGender={this.changeIncludedGender}*/}
                        {/*    />*/}
                        {/*</Content>*/}
                    </Sider>
                    <Layout>
                        <Content style={{ height: 300 }}>
                            <Table columns={columns} dataSource={this.state.data} />
                        </Content>
                        <Layout style={{ height: 600 }}>
                            <Content>
                                <Table columns={colum2} dataSource={this.state.transactionData} />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
                {/*{this.props.match.params.customer_id}*/}
            </div>
        );
    }
}

export default CustomerDetail;