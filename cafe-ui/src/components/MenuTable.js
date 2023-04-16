import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Card, Radio, Table, Row, Col } from 'antd'
import { startGetfilteredMenu } from '../actions/homeAction'

const MenuTable = (props) => {
    const [filterCategory, setFilterCategory] = useState('')

    const dispatch = useDispatch()

    const menuItemData = useSelector((state) => {
        return state.home.menutableData
    })
    const categories = useSelector((state) => {
        return state.category.data
    })

    const onFilterSelected = (e) => {
        setFilterCategory(e.target.value);
        dispatch(startGetfilteredMenu(e.target.value))
    };

    const menuData = []
    menuItemData.map((item) => {
        const categoryName = categories.filter(ele => ele._id == item.categoryId)
        const data = {
            categoryId: item.categoryId,
            itemId: item._id,
            itemName: item.itemName,
            type: categoryName.map(ele => ele.categoryName).toString(),
            itemPrice: item.itemPrice
        }
        menuData.push(data)
    })

    const menuColumns = [
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            key: 'itemName'
        },
        {
            title: 'type',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: 'Price',
            dataIndex: 'itemPrice',
            key: 'itemPrice'
        }
    ]
    return (
        <Card type='inner'>
            <Radio.Group onChange={onFilterSelected} value={filterCategory}>
                <Radio value={""}>All</Radio>
                {categories.map((ele) => {
                    return <Radio value={ele._id}>{ele.categoryName}</Radio>
                })}
            </Radio.Group>
            <Table
                columns={menuColumns} dataSource={
                    menuData.map((ele) => {
                        return {
                            itemName: ele.itemName,
                            categoryName: ele.type,
                            itemPrice: ele.itemPrice
                        }
                    })
                } />
        </Card>
    )
}
export default MenuTable