import React, {useState} from "react";
import 'antd/dist/reset.css';
import { Formik } from 'formik';
import { Card, Typography } from 'antd'
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideModal } from "../actions/modalAction";
import { addItemButtonClicked} from "../actions/modalAction";
import { startAddItem } from "../actions/MenuItemAction";
import {
    Button,
    Form,
    Input,
    Radio,
    DatePicker,
    Select,
    Modal
} from 'antd';
const AddMenuItem = (props) => {
    const title = props.title
    const buttonName = props.buttonName

    const dispatch = useDispatch()

    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const categories=useSelector((state)=>{
        return state.category.data
    })
   
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(hideModal())
            dispatch(addItemButtonClicked(false))
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(hideModal())
        dispatch(addItemButtonClicked(false))
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
            <Card title={<Title level={2}>{title}</Title>}>
                <Formik
                    initialValues={{
                        itemName: '',
                        categoryId:'',
                        itemPrice:''
                    }}
                    enableReinitialize
                    validationSchema={Yup.object().shape({
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
                        setTimeout(() => {
                            const item = {
                                itemName: values.itemName,
                                categoryId:values.categoryId,
                                itemPrice:values.itemPrice
                            }
                            dispatch(startAddItem(item))
                            setSubmitting(false)
                            dispatch(hideModal())
                            dispatch(addItemButtonClicked(false))
                        })
                    }}
                >
                    {formik => (
                        <Form
                            onFinish={formik.handleSubmit} form={form}
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 8,
                            }}
                            layout="horizontal"
                            initialValues={{
                                size: componentSize,
                            }}

                        >

                            <Form.Item
                                label="Item Name"
                                name="itemName"
                                rules={[{ required: true, message: 'Item name required!' }]}
                            >
                                <Input {...formik.getFieldProps('itemName')} />

                            </Form.Item>
                            <span>
                                {formik.touched.itemName && formik.errors.itemName ? (
                                    <div style={{ color: 'red' }}>{formik.errors.itemName}</div>
                                ) : null}
                            </span>

                            <Form.Item
                                label="Select Category"
                                name="categoryId"
                                rules={[{ required: true, message: 'Category name required!' }]}
                            >
                                <Select required onChange={(value) => { formik.setFieldValue('categoryId', value); }} onSelect={formik.handleChange}>
                                    {categories.map((ele) => {
                                        return (<Option key={ele._id} name="categoryId" value={ele._id}>{ele.categoryName}</Option>)
                                    })}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Item Price"
                                name="itemPrice"
                                rules={[{ required: true, message: 'Item Price required!' }]}
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

                            <Form.Item>
                                <Button style={{ marginLeft: '150px' }} type="primary" htmlType="submit">{buttonName}</Button>
                            </Form.Item>

                        </Form>
                    )}
                </Formik>
            </Card >
        </Modal>
    )
}
export default AddMenuItem