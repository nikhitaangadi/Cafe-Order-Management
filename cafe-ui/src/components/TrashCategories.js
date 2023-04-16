import React from "react";
import { Card,Button,Table } from "antd";
import Swal from "sweetalert2";
import {DeleteOutlined} from '@ant-design/icons'
import { useSelector, useDispatch } from "react-redux";
import { startRestoreCategory } from "../actions/categoryAction";
import { startDeleteCategory } from "../actions/categoryAction";
const TrashCategories = (props) => {

    const deletedcategories = useSelector((state) => {
        return state.category.deletedCategory
    })

    const dispatch = useDispatch()

    const Categorycolumns = [
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName'
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
                            onClick={() => handleRestoreClick(record)}
                            size="large"
                        >Restore</Button>
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
        }
    ]

    const handleRestoreClick = (record) => {
        console.log('Restore', record)
        dispatch(startRestoreCategory(record.categoryId))
    }

    const handleDeleteClick = (record) => {
        console.log('Delete', record)
        Swal.fire({
            icon: 'question',
            title: "Delete Permanently?",
            text: "You will not be able to restore this.",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete Permanently",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteCategory(record.categoryId))
            }
        })
    }

    return (
        <Card type="inner" title='Categories'>
            <Table
                columns={Categorycolumns} dataSource={
                    deletedcategories.map((ele) => {

                        return {
                            key: ele._id,
                            categoryName: ele.categoryName,
                            categoryId: ele._id
                        }
                    })
                } />
                    
        </Card>
    )
}
export default TrashCategories