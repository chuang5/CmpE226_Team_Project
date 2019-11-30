import React from 'react';
import './App.css';
import {Card, Col, Row, Alert} from "antd";
import Pic from "./assets/960x1.jpg";
import CustomMenu from "./Menu";
import MyBusiness from "./MyBusiness";
import AddCustomer from "./AddCustomer";
import MyAlert from "./MyAlert";
import DeleteCustomer from "./DeleteCustomer";
import OpenAccount from "./OpenAccount";
import Transaction from "./Transaction";

class Main extends React.Component {

  state = {
      contentOne: 'Text One',
      isAddCustomerSuccess: false,
      isDeleteCustomerSuccess: false,
      key: '1',
  };

  conditionalRender() {
      if (this.state.key === '1') {
          return <MyBusiness/>;
      } else if (this.state.key === '5') {

          return <AddCustomer onceAddCustomerSuccess={this.handleChangeIsAddCustomerSuccess.bind(this)}/>;

      } else if (this.state.key === '6') {

          return <DeleteCustomer onDeleteCustomerSuccess={this.handleChangeIsDeleteCustomerSuccess.bind(this)}/>;

      } else if (this.state.key === '7') {

          return <OpenAccount/>

      } else if (this.state.key === '8') {

          return <Transaction/>

      }
  }

  handleChangeContentOne(menuKey) {

      switch(menuKey.key) {
          case "1":
              this.setState(
                  {key: '1'}
              );
              break;

          case "5":
              this.setState(
                  {key: '5'}
              );
              break;

          case "6":
              this.setState(
                  {key: '6'}
              );
              break;
          case "7":
              this.setState(
                  {key: '7'}
              );
              break;
          case "8":
              this.setState(
                  {key: '8'}
              );
              break;
      }
  }
  handleChangeIsDeleteCustomerSuccess() {
      this.setState(
          {isDeleteCustomerSuccess: true}
      );
  }
  handleChangeIsAddCustomerSuccess() {
      alert("Add customer successfully!")
  }

  render() {
    return (
        <>
            <Card bodyStyle={{ backgroundImage: `url(${Pic})`, height: 500, width: '100%',
              backgroundSize:'100% 100%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'top center' }}>
              <Row type='flex' justify='space-around'>
                <h2 style={{color: 'white'}}> Header </h2>
              </Row>
            </Card>

            <Card>
                <Row gutter={32}>

                    <Col span={8}>
                      <CustomMenu changeContent={this.handleChangeContentOne.bind(this)} />
                    </Col>

                    {/*second col*/}
                    {this.conditionalRender()}

                </Row>
            </Card>
        </>
    );
  }
}

export default Main;