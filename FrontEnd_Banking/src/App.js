//This is my own design: car background pic + nav bar + userlist

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import {Button, Card, Col, Icon, Row, Typography} from "antd";
// import Pic from "./assets/960x0.jpg";
// import CustomMenu from "./Menu";
// import FilterTag from "./FilterTag";
// import CustomerList from "./CustomerList";
//
// class App extends React.Component {
//
//   state = {
//     contentOne: 'Text One',
//     key: '1',
//   }
//
//   handleChangeContentOne(menuKey) {
//     switch(menuKey) {
//       case "":
//     }
//     this.setState({
//       contentOne: `New Content ${Math.random() * 100}`
//
//     });
//   }
//
//   render() {
//     const { contentOne, key } = this.state;
//     return (
//         <>
//         <Card bodyStyle={{ backgroundImage: `url(${Pic})`, height: 500, width: '100%',
//           backgroundSize:'100% 100%',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'top center' }}>
//           <Row type='flex' justify='space-around'>
//             <h2 style={{color: 'white'}}> Header </h2>
//           </Row>
//         </Card>
//         <Card>
//         <Row gutter={32}>
//
//         <Col span={12}>
//           <CustomMenu changeContent={this.handleChangeContentOne.bind(this)} />
//         {/*<div style={{border: '1px solid #0d0d9d'}}>Card One</div>*/}
//         </Col>
//
//         <Col span={12}>
//           <Row>
//             <Typography.Title level={4}> Title </Typography.Title>
//             <Typography.Paragraph> {contentOne} </Typography.Paragraph>
//           </Row>
//
//           <Row>
//             {/*<Typography.Text type='secondary'>Text Two</Typography.Text>*/}
//             {/*<Button type='link' size='small' icon='linkedin' />*/}
//             {/*<Icon type="linkedin" theme="filled" style={{color: 'green'}} />*/}
//             <FilterTag />
//           </Row>
//           <Row>
//             <CustomerList />
//           </Row>
//         </Col>
//         </Row>
//         </Card>
//           </>
//     );
//   }
// }
//
// export default App;

//This is login part
import React, { Component } from 'react';
import './App.css';
import Loginscreen from './Loginscreen'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            loginPage:[],
            uploadScreen:[]
        }
    }
    componentWillMount(){
        let loginPage = [];
        loginPage.push(<Loginscreen parentContext={this}/>);
        this.setState({
            loginPage:loginPage
        })
    }
    render() {
        return (
            <div className="App">
                {this.state.loginPage}
                {this.state.uploadScreen}
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default App;