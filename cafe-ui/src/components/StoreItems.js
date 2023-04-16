import React, { useState } from 'react'
import 'antd/dist/reset.css';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux'
import { Table, Button, Form, Divider, Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux";
import { showModal } from "../actions/modalAction";
import { editButtonClicked } from "../actions/modalAction";
import { setEditData } from '../actions/modalAction';
 import { startSoftDeleteItem } from '../actions/MenuItemAction'; 
import EditItemForm from './EditItemForm';

const StoreItems = (props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [recordId, setRecordId] = useState('')
    const [editingKey, setEditingKey] = useState('');


    const dispatch = useDispatch()

    const itemData = useSelector((state) => {
        return state.item.data
    })
    console.log('itemData',itemData)
    const categories = useSelector((state) => {
        return state.category.data
    })
    console.log('Categories',categories)
    const handleClick = (record) => {
        console.log('RECORD', record)
        const data = {
            id: record.id,
            categoryName: record.categoryName
        }
        dispatch(setEditData(data))
        dispatch(editButtonClicked(true))
        dispatch(showModal())
    }

    const handleDeleteClick = (record) => {
        Swal.fire({
            title: "Are you sure?",
            text: "But you will still be able to retrieve this file.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Remove it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startSoftDeleteItem(record.id))
            }
        })
    }



    const columns = [
        {
            title: "Action",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (text, record, index) => {
                return (
                    <div>
                        <Button
                            type='text'
                            icon={<EditOutlined />}
                            id={record.id}
                            onClick={() => handleClick(record)}
                            size="large"
                        />
                        <Button
                            type='text'
                            icon={<DeleteOutlined />}
                            id={record.id}
                            onClick={() => handleDeleteClick(record)}
                            size="large"
                        />
                    </div>
                );
            }
        },
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Price',
            dataIndex: 'itemPrice',
            key: 'itemPrice',
        }
        
    ]

    const isClicked = useSelector((state) => {
        return state.modal.editButtonClicked
    })

    return (
        <Card type='inner' >

            {isClicked && <div> <EditItemForm title='Edit Item' buttonName='Update Item' /> </div>}
            <Table
                pagination={{ pageSizeOptions: ['2', '5'], showSizeChanger: true }}
                columns={columns} dataSource={

                    itemData.map((ele) => {
                        const category = categories.filter((category) => {
                            return category._id == ele.categoryId
                        })
                        const categoryName = (category.map((ele) => {
                            return ele.categoryName
                            
                        })).toString()
                        return {
                            key: ele._id,
                            categoryName: categoryName,
                            categoryId: ele.categoryId,
                            itemName: ele.itemName,
                            itemPrice: ele.itemPrice,
                            id: ele._id,
                        }
                    })} />
        </Card>
    )
}
export default StoreItems