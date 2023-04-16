import React from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

const AdminStoreOrdes=(props)=>{

    const { Title } = Typography
    const dispatch = useDispatch()

    const orderPending = useSelector((state) => {
        return state.order.data
    })
    
    const itemData = useSelector((state) => {
        return state.item.data
    })
    const completedOrders = useSelector((state) => {
        return state.order.completedOrders
    })

    return(
        <Card>
            <Row>
                <Col span={11}>
                    <Card type='inner' title='Pending Orders'>
                        <Row >
                            {orderPending.length > 0 ? (orderPending.map((order) => {
                                const item = itemData.filter(ele => ele._id === order.menuItem)
                                const itemName = item.map(ele => ele.itemName)
                                return (
                                    <Col span={8} offset={1} style={{ marginTop: '10px' }}><Card key={order.count} title={`#${order.count}`}>{itemName}</Card></Col>
                                )
                            })) : (
                                <h2>No Pending Orders</h2>
                            )}
                        </Row>
                    </Card>
                </Col>
                <Col span={11} offset={1}>
                    <Card type='inner' title='Completed Orders'>
                        <Row >
                            {completedOrders.length > 0 ? (completedOrders.map((order) => {
                                const item = itemData.filter(ele => ele._id === order.menuItem)
                                const itemName = item.map(ele => ele.itemName)
                                return (
                                    <Col span={8} offset={1} style={{ marginTop: '10px' }}><Card key={order.count} title={`#${order.count}`}>{itemName}</Card></Col>
                                )
                            })) : (
                                <h2>No Completed Orders</h2>
                            )}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Card>
    )
}
export default AdminStoreOrdes