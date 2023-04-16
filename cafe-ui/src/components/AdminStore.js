import React, {useState} from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { DeleteOutlined } from '@ant-design/icons'
import AddStore from "./AddStore";
import { useSelector, useDispatch } from "react-redux";
import { addButtonClicked } from "../actions/modalAction";
import { showModal,showButtonClicked } from "../actions/modalAction";
import StoreDetails from "./StoreDetails";
import { startGetAdminCategory } from "../actions/categoryAction";
import { startGetAdminItem } from "../actions/MenuItemAction";
import { startGetAdminOrders,startGetAdminCompletedOrders } from "../actions/orderAction";
import { startDeleteStore } from "../actions/StoreAction";

const AdminStore = (props) => {
    const dispatch=useDispatch()
    const isClicked=useSelector((state)=>{
        return state.modal.addButtonClicked
    })
    const isShowClicked=useSelector((state)=>{
        return state.modal.showButtonClicked
    })
    const { Title } = Typography
    const store = useSelector((state) => {
        return state.store.data
    })
    const isShown=useSelector((state)=>{
        return state.modal.isShown
    })
    console.log('Store', store)

    const handleAddClick=()=>{
        dispatch(addButtonClicked(true))
        dispatch(showModal())
    }
    const handleClick=(id)=>{
        dispatch(showButtonClicked(true))
        dispatch(showModal())
        dispatch(startGetAdminCategory(id))
        dispatch(startGetAdminItem(id))
        dispatch(startGetAdminOrders(id))
        dispatch(startGetAdminCompletedOrders(id))
    }

    const handleDeleteClick=(id)=>{
        dispatch(startDeleteStore(id))
    }
    return (
        <Card>
            <Button type="primary" onClick={handleAddClick}>Add Store</Button>
            {isShown && isClicked && <div> <AddStore title='Add Store' buttonName='Add Store' /> </div>}
            {isShown && isShowClicked && <div> <StoreDetails title='Store Details'/> </div>}
            {store.length>0 ? (
                <Card type="inner" style={{marginTop:'10px'}}>
                <Row style={{marginLeft:'5px'}}>
                    {store.map((ele) => {
                        return (
                            <Col span={7} offset={1} style={{marginTop:'10px'}}>
                                <Card type="inner" title={ele.storeName} key={ele._id} onClick={()=>{handleClick(ele._id)}}>{ele.address}</Card>
                                <Button type="primary" style={{ width:'100%'}} onClick={()=>{handleDeleteClick(ele._id)}}><DeleteOutlined/></Button>
                            </Col>
                        )
                    })}
                </Row>
            </Card>
            ):(
                <center><Title>Please Add Stores</Title></center>
            )}
            
        </Card>
    )
}
export default AdminStore