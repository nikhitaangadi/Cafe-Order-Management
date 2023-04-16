import React from 'react'
import { Button, Card, Col, Row, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { startDeleteAllOrders } from '../actions/orderAction'

const ShowOrders = (props) => {

    const { Title } = Typography
    const dispatch = useDispatch()

    const orderPending = useSelector((state) => {
        return state.order.data
    })
    console.log('Pending', orderPending)
    const itemData = useSelector((state) => {
        return state.item.data
    })
    const completedOrders = useSelector((state) => {
        return state.order.completedOrders
    })
    console.log('Completed', completedOrders)

    const handleDelete = () => {
        dispatch(startDeleteAllOrders())
    }
    return (
        <Card>
            <Row style={{ justifyContent: 'center', marginBottom: '20px' }}>
                <Button type='primary' size='large' onClick={handleDelete}><Title level={4}>Delete All Orders</Title></Button>
            </Row>
            <Row>
                <Col span={11}>
                    <Card type='inner' title='Pending Orders'>
                        <Row style={{ marginLeft: '5px' }}>
                            {orderPending.length > 0 ? (orderPending.map((order) => {
                                const item = itemData.filter(ele => ele._id === order.menuItem)
                                const itemName = item.map(ele => ele.itemName)
                                return (
                                    <Col span={6} offset={1} style={{ marginTop: '10px' }}><Card key={order.count} title={`#${order.count}`}>{itemName}</Card></Col>
                                )
                            })) : (
                                <h2>No Pending Orders</h2>
                            )}
                        </Row>
                    </Card>
                </Col>
                <Col span={11} offset={1}>
                    <Card type='inner' title='Completed Orders'>
                        <Row style={{ marginLeft: '5px' }}>
                            {completedOrders.length > 0 ? (completedOrders.map((order) => {
                                const item = itemData.filter(ele => ele._id === order.menuItem)
                                const itemName = item.map(ele => ele.itemName)
                                return (
                                    <Col span={6} offset={1} style={{ marginTop: '10px' }}><Card key={order.count} title={`#${order.count}`}>{itemName}</Card></Col>
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
export default ShowOrders