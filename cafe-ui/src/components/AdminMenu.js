import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Radio, Table, Row, Col } from 'antd'

const AdminMenu = (props) => {

    const dispatch = useDispatch()

    const menuItemData = useSelector((state) => {
        return state.item.data
    })
    const categories = useSelector((state) => {
        return state.category.data
    })

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
export default AdminMenu