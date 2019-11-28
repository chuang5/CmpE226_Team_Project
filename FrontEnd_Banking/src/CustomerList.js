import React from 'react';
import axios from 'axios';
// import { List, Avatar, Icon } from 'antd';
//
// const listData = [];
// for (let i = 0; i < 23; i++) {
//     listData.push({
//         href: 'http://ant.design',
//         title: `customer ${i}`,
//         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//         description:
//             'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//         content:
//             'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//     });
// }
//
// const IconText = ({ type, text }) => (
//     <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//         {text}
//   </span>
// );
// class CustomerList extends React.Component {
//     render() {
//         return (
//             <List
//                 itemLayout="vertical"
//                 size="large"
//                 pagination={{
//                     onChange: page => {
//                         console.log(page);
//                     },
//                     pageSize: 3,
//                 }}
//                 dataSource={listData}
//                 footer={
//                     <div>
//                         <b>ant design</b> footer part
//                     </div>
//                 }
//                 renderItem={item => (
//                     <List.Item
//                         key={item.title}
//                         actions={[
//                             <IconText type="star" text="24" key="list-vertical-star-o" />,
//                             <IconText type="like-o" text="156" key="list-vertical-like-o" />,
//                             <IconText type="message" text="2" key="list-vertical-message" />,
//                         ]}
//                         // extra={
//                         //     <img
//                         //         width={272}
//                         //         // alt="logo"
//                         //         // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//                         //     />
//                         // }
//                     >
//                         <List.Item.Meta
//                             avatar={<Avatar src={item.avatar} />}
//                             title={<a href={item.href}>{item.title}</a>}
//                             description={item.description}
//                         />
//                         {item.content}
//                     </List.Item>
//                 )}
//             />
//                 // mountNode,
//         );
//     }
// }
// export default CustomerList;

import { List, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';

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

    // fetchData = callback => {
    //     reqwest({
    //         url: fakeDataUrl,
    //         type: 'json',
    //         method: 'get',
    //         contentType: 'application/json',
    //         success: res => {
    //             callback(res);
    //         },
    //     });
    // };

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

    render() {
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
                                    title={<a href="/customerDetail">{item.name}</a>}
                                    //title={<a href="https://ant.design">{item.name}</a>}
                                    description={item.ssn}
                                />
                                <div>{item.phone}</div>
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