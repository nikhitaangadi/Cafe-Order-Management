import React from 'react'
import { Typography, Card, Row, Col } from 'antd'
import { useSelector } from 'react-redux'
import MenuTable from './MenuTable'
import SearchMenu from './SearchMenu'
import Order from './Order'

const StoreHome = (props) => {
    const { Title } = Typography
    const category = useSelector((state) => {
        return state.category.data
    })
    const store=useSelector((state)=>{
        return state.store.data
    })
    const storeName=store.map(ele=>ele.storeName).toString()
    return (
        <div style={{ backgroundColor: 'lightgoldenrodyellow',height:'100vh' }}>
            <Card style={{ backgroundColor: 'Highlight' }} title={<center><Title style={{ color: 'white' }}>Welcome To {storeName}</Title></center>}>
                {category.length > 0 ? (
                    <Card type='inner' style={{height:'100vh'}}>
                        <Row>
                            <Col span={7}>
                                <MenuTable />
                            </Col>
                            <Col span={6} offset={1}>
                                <SearchMenu />
                            </Col>
                            <Col span={8} offset={1}>
                                <Order />
                            </Col>
                        </Row>
                    </Card>
                ) : (
                    <center><Title>Please Add Menu Details</Title></center>
                )}

            </Card>
        </div>
    )
}
export default StoreHome