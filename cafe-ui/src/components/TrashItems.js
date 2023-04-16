import React from "react";
import { Card,Button,Table } from "antd";
import {DeleteOutlined} from '@ant-design/icons'
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { startRestoreItem,startDeleteItem } from "../actions/MenuItemAction";
const TrashItems = (props) => {

    const dispatch = useDispatch()
    const deleteditems = useSelector((state) => {
        return state.item.deletedItem
    })

    const deletedcategories = useSelector((state) => {
        return state.category.deletedCategory
    })

    const itemColumns = [
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            key: 'itemName'
        },
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
                            id={record.id}
                            onClick={() => handleItemRestoreClick(record)}
                            size="large"
                        >Restore</Button>
                        <Button
                            type='text'
                            icon={<DeleteOutlined />}
                            id={record.id}
                            onClick={() => handleItemDeleteClick(record)}
                            size="large"
                        />
                    </div>

                );
            }
        }
    ]


    const handleItemRestoreClick = (record) => {
        console.log('RestoreExpense', record)
        const catId = deletedcategories.filter(ele => ele._id === record.categoryId)
        if (!catId.length == 0) {
            Swal.fire({
                icon: 'info',
                text: 'Please Restore the Category first',
                width: '300px',
                timer: 3000,
                showConfirmButton: false
            })
        } else {
            dispatch(startRestoreItem(record.id))
        }

    }
    const handleItemDeleteClick = (record) => {
        Swal.fire({
            icon: 'question',
            title: "Delete Permanently?",
            text: "You will not be able to retrieve this.",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete Permanently",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteItem(record.id))
            }
        })
    }
    return (
        <Card type="inner" title='Items'>
            <Table
                columns={itemColumns} dataSource={
                    deleteditems.map((ele) => {

                        return {
                            key: ele._id,
                            itemName: ele.itemName,
                            expenseId: ele._id,
                            categoryId: ele.categoryId,
                            id:ele._id
                        }
                    })
                } />
        </Card>
    )
}
export default TrashItems