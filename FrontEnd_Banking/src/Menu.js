//SJSU CMPE 226 Fall 2019 TEAM4
import { Menu, Icon, Button } from 'antd';
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const { SubMenu } = Menu;

class CustomMenu extends React.Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const { changeContent } = this.props;
        return (
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                    onClick={changeContent}
                >
                    <Menu.Item key="1" >
                        <Icon type="pie-chart" />
                        <span>
                            <Link to='/main/myBusiness' >My Business</Link>
                        </span>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>Action</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Link to='/main/addCustomer' >Add Customer </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to='/main/openAccount'>Open Account</Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to='/main/transaction'>Transaction</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="13">
                        <Icon type="logout" />
                        <span>Logout</span>
                        <Link to='/' ></Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default CustomMenu;