import React, { useState } from "react";
import 'antd/dist/reset.css';
import { Formik } from 'formik';
import { Card, Typography } from 'antd'
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideModal } from "../actions/modalAction";
import { editButtonClicked } from "../actions/modalAction";
import { startUpdateItem } from "../actions/MenuItemAction"; 
import {
    Button,
    Form,
    Input,
    Select,
    Modal
} from 'antd';

const EditItemForm = (props) => {
    const editData = useSelector((state) => {
        return state.modal.data
    })
    
    const itemData = useSelector(state => {
        return state.item.data.find(ele => ele._id == editData.id)
    })
    console.log(itemData)
    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const categories = useSelector((state) => {
        return state.category.data
    })

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const dispatch = useDispatch()

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(hideModal())
            dispatch(editButtonClicked(false))
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        dispatch(hideModal())
        dispatch(editButtonClicked(false))
    };

    const { Title } = Typography
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const [form] = Form.useForm();
    const { Option } = Select

    return (
        <Modal
            open={isShown}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Card title={<Title level={2}>Edit Item</Title>}>
                <Formik
                    initialValues={{
                        itemName: itemData.itemName,
                        itemPrice: itemData.itemPrice,
                        categoryId: itemData.categoryId
                    }}
                    enableReinitialize

                    validationSchema={Yup.object({
                        itemName: Yup.string()
                        .required('ERROR:Required')
                        .min(2, 'ERROR:Must be minimum 2 characters'),
                    itemPrice: Yup.number()
                        .required('ERROR:Required')
                        .test(
                            'Is positive?',
                            'ERROR: The number must be greater than 0!',
                            (value) => value > 0
                        ),
                    categoryId: Yup.string()
                        .required('ERROR:Required')
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        let formatted = new Date(values.expense_date)
                        const updatedItemData = {
                            itemName: values.itemName,
                                categoryId:values.categoryId,
                                itemPrice:values.itemPrice
                        }
                        dispatch(startUpdateItem(itemData._id, updatedItemData))
                        setSubmitting(false)
                        dispatch(hideModal())
                        dispatch(editButtonClicked(false))
                    }}
                >
                    {formik => (
                        <Form
                            initialValues={{
                                itemName: formik.values.itemName,
                                itemPrice: formik.values.itemPrice,
                                categoryId: formik.values.categoryId
                            }}
                            onFinish={formik.handleSubmit} form={form}

                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 10,
                            }}
                            layout="horizontal"

                            
                        >
                            

                            <Form.Item
                                label="Item Name"
                                name="itemName"
                                rules={[{ required: true, message: 'Item Name Required!' }]}
                            >
                                <Input {...formik.getFieldProps('itemName')} />

                            </Form.Item>
                            <span>
                                {formik.touched.itemName && formik.errors.itemName ? (
                                    <div style={{ color: 'red' }}>{formik.errors.itemName}</div>
                                ) : null}
                            </span>
                            <Form.Item
                                label="Item Price"
                                name="itemPrice"
                                rules={[{ required: true, message: 'Item Price Required!' }]}
                            >
                                <Input
                                    name="itemPrice"
                                    value={formik.values.itemPrice}
                                    onChange={formik.handleChange}
                                />
                            </Form.Item>

                            {formik.touched.itemPrice && formik.errors.itemPrice ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.itemPrice}</div>
                            ) : null}

                            
                            <Form.Item
                                label="categoryName"
                                name="categoryName"

                            >
                                <Select defaultValue={itemData.categoryId} onChange={(value) => { formik.setFieldValue('categoryId', value); }} onSelect={formik.handleChange}>
                                    {categories.map((ele) => {
                                        return (<Option key={ele._id} name="categoryId" value={ele._id}>{ele.categoryName}</Option>)
                                    })}
                                </Select>
                            </Form.Item>
                            {formik.touched.categoryId && formik.errors.categoryId ? (
                                <div style={{ color: 'red' }}>{formik.errors.categoryId}</div>
                            ) : null}

                            <Form.Item>
                                <Button style={{ marginLeft: '150px' }} type="primary" htmlType="submit">Update Expense</Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
            </Card >
        </Modal>
    )
}
export default EditItemForm