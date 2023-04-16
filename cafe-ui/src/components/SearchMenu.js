import React, {useState} from "react";
import { Typography, Card, Radio, Table,Row,Col,Input,Button } from 'antd'
import { useSelector,useDispatch } from "react-redux";
import { startGetSearchData, reset, countInc } from "../actions/homeAction";
import { startCreateOrder } from "../actions/orderAction";
import { setOrderMessage } from "../actions/homeAction";

const SearchMenu=(props)=>{
    const [searchItem,setSearchItem]=useState('')
    const [message,setMessage]=useState('')
    
    const searchData=useSelector((state)=>{
        return state.home.searchData
    })

    const dispatch=useDispatch()

    const handleSearchItem=(e)=>{
        const search=e.target.value
        setSearchItem(search)
        
        if(search.length>=3){
            dispatch(startGetSearchData(search))
        }else{
            dispatch(reset())
        }
    }

    const handleClick=(id)=>{
        const count=Number((localStorage.getItem('orderCount')))+1
        dispatch(countInc())
        const data={
            menuItem:id,
            count:count
        }
        dispatch(startCreateOrder(data))
        setMessage('OrderCreated')
        localStorage.setItem('orderCount',count)
        dispatch(setOrderMessage('Order Created'))
        
    }
    
    return(
        <Card type="inner">
            <Input placeholder='Search Item' onChange={handleSearchItem}/>
            {searchData.length>0  && (
                searchData.map((ele)=>{
                    return (
                        <Card title={ele.itemName} key={ele._id}>
                            <Row style={{display:'flex'}}>
                                <Col span={14}>
                                Price:₹{ele.itemPrice}
                                </Col>
                                <Col span={8} offset={2}>
                                    <Button type="primary" onClick={()=>{handleClick(ele._id)}}>ADD</Button>
                                </Col>
                            </Row>
                            
                        </Card>
                    )
                })
            )}
            {searchData.length==0 && searchItem.length>=3 && (
                <h3 style={{color:'red'}}>This item is currently unavailable</h3>
            )}

        </Card>

    )
}
export default SearchMenu