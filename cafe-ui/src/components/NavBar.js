import React from "react";
import { Link, Route, withRouter, Redirect } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { UserOutlined, HomeTwoTone, ShopTwoTone } from '@ant-design/icons';
import MainPage from "./MainPage";
import Admin from "./Admin";
import Store from "./Store";
import AdminStore from "./AdminStore";
import AdminHome from "./AdminHome";
import StoreHome from "./StoreHome";
import AddMenu from "./AddMenu";
import ShowOrders from "./ShowOrders";
import Swal from "sweetalert2";

const { Header, Content, Footer } = Layout;

const NavBar = (props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const style={
        fontSize:'20px'
    }
    const adminToken = localStorage.getItem('token')
    const storeToken = localStorage.getItem('storetoken')
    const loginToken = adminToken ? adminToken : storeToken
    const role = localStorage.getItem('role')
    console.log(role)
    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <div className="logo" />
                {loginToken ? (
                    adminToken ? (
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            style={style}
                            selectedKeys={[props.location.pathname]}
                            items={[
                                {
                                    key: "/adminHome",
                                    icon: <HomeTwoTone style={style}/>,
                                    label: <Link to='/adminHome'>Home</Link>,
                                },
                                {
                                    key: "/adminStore",
                                    icon: <ShopTwoTone style={style}/>,
                                    label: <Link to='/adminStore'>Store</Link>,
                                },
                                {
                                    label: <Link onClick={() => {
                                        localStorage.removeItem('token')
                                        localStorage.removeItem('role')
                                        Swal.fire({
                                            text: 'Logged-Out Successfully',
                                            icon: 'success',
                                            width: '200px',
                                            timer: 3000,
                                            width: '300px',
                                            showConfirmButton: false
                                        })
                                        props.history.push('/mainpage')
                                    }}>Logout</Link>
                                }
                            ]}
                        />
                    ) : (
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[props.location.pathname]}
                            defaultSelectedKeys={['/storeHome']}
                            style={style}
                            items={[
                                {
                                    key: "/storeHome",
                                    icon: <HomeTwoTone style={style}/>,
                                    label: <Link to='/storeHome'>Home</Link>,
                                },
                                {
                                    key: "/addMenu",
                                    icon: <UserOutlined style={style}/>,
                                    label: <Link to='/addMenu'>Add Menu</Link>,
                                },
                                {
                                    key: "/showOrders",
                                    icon: <ShopTwoTone style={style}/>,
                                    label: <Link to='/showOrders'>Orders</Link>,
                                },
                                {
                                    label: <Link onClick={() => {
                                        localStorage.removeItem('storetoken')
                                        localStorage.removeItem('orderCount')
                                        Swal.fire({
                                            text: 'Logged-Out Successfully',
                                            icon: 'success',
                                            width: '200px',
                                            timer: 3000,
                                            width: '300px',
                                            showConfirmButton: false
                                        })
                                        props.history.push('/mainpage')
                                    }}>Logout</Link>
                                }

                            ]}
                        />
                    )
                ) : (
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={style}
                        selectedKeys={[props.location.pathname]}
                        items={[
                            {
                                key: "/mainPage",
                                icon: <HomeTwoTone style={style} />,
                                label: <Link to='/mainpage'>Main Page</Link>,
                            },
                            {
                                key: "/admin",
                                icon: <UserOutlined style={style}/>,
                                label: <Link to='/admin'>Admin</Link>,
                            },
                            {
                                key: "/store",
                                icon: <ShopTwoTone style={style}/>,
                                label: <Link to='/store'>Store</Link>,
                            }
                        ]}
                    />
                )}

            </Header>
            <Content
                style={{
                    padding: '0 50px'
                }}
            >

                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                        height: '100vh'
                    }}
                >
                    <Route exact path="/" component={() => (<Redirect to='/mainpage' />)} />
                    <Route exact path='/mainpage' component={MainPage} />
                    <Route exact path='/admin' component={Admin} />
                    <Route exact path='/adminHome' component={AdminHome} />
                    <Route exact path='/store' component={Store} />
                    <Route exact path='/adminStore' component={AdminStore} />
                    <Route exact path='/storeHome' component={StoreHome} />
                    <Route exact path='/addMenu' component={AddMenu} />
                    <Route exact path='/showOrders' component={ShowOrders} />
                </div>
            </Content>

        </Layout>
    );
}
export default withRouter(NavBar)