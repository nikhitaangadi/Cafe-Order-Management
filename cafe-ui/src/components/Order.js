import React, { useEffect, useState } from 'react'
import { Card, Typography, Checkbox, Col, Row } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { startOrderSoftDelete } from '../actions/orderAction'
import { setOrderMessage, setOrderStatus } from '../actions/homeAction'
import { startGetCompletedOrders, startGetOrders } from '../actions/orderAction'

const Order = (props) => {
    const { Title } = Typography
    const [firstItem, setFirstItem] = useState({})
    const dispatch = useDispatch()
    const orderMessage = useSelector((state) => {
        return state.home.orderMessage
    })
    const count = useSelector((state) => {
        return state.home.count
    })
    const orderStatus = useSelector((state) => {
        return state.home.orderStatus
    })
    const orders = useSelector((state) => {
        return state.order.data
    })
    const itemData = useSelector((state) => {
        return state.item.data
    })
    useEffect(() => {
        setFirstItem({ ...orders[0] })
    }, [orders])

    console.log('ID-', firstItem.menuItem)

    let sum = 0
    orders.map((order) => {
        const item = itemData.filter(ele => ele._id === order.menuItem)
        item.map((ele) => {
            sum += ele.itemPrice
        })
        return sum
    })
    console.log('id', firstItem._id)
    const onChange = (id, itemName) => {
        dispatch(startOrderSoftDelete(id))
        dispatch(setOrderStatus(`Your ${itemName} is ready`))
        dispatch(startGetCompletedOrders())
        dispatch(startGetOrders())
    }
    useEffect(() => {
        setTimeout(() => {
            dispatch(setOrderMessage(''))
        }, 5000)
    })
    useEffect(() => {
        setTimeout(() => {
            dispatch(setOrderStatus(''))
        }, 10000)
    })
    return (
        <Card>
            <Title level={5} type='success'>{orderMessage}</Title>
            <Title level={5} type='success'>{orderStatus}</Title>
            <Card type='inner'><Title level={3}>Amount Due- {sum}</Title></Card>
            <form>
                {orders.map((order) => {
                    const item = itemData.filter(ele => ele._id === order.menuItem)
                    const itemName = item.map(ele => ele.itemName)
                    console.log('I D-', order.menuItem)
                    return <Card key={order.count} title={`#${order.count}`} >
                        <Row>
                            <Col span={16}>{itemName}</Col>
                            <Col offset={4}>
                                <Checkbox name='order' style={{height:'10px',width:'10px'}} checked={false} onChange={() => { onChange(order._id, itemName) }} disabled={firstItem._id === order._id ? false : true}
                                ></Checkbox>
                            </Col>
                        </Row>

                    </Card>
                })}
            </form>
        </Card>
    )
}
export default Order