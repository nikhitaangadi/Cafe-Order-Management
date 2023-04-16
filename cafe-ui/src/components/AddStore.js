import React, { useState } from "react";
import 'antd/dist/reset.css';
import { Formik } from 'formik';
import { Card, Typography } from 'antd'
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideModal } from "../actions/modalAction";
import { addButtonClicked } from "../actions/modalAction";
import { startAddStore } from "../actions/StoreAction";
import {
    Button,
    Form,
    Input,
    Radio,
    DatePicker,
    Select,
    Modal
} from 'antd';

const AddStore = (props) => {
    const title = props.title
    const buttonName = props.buttonName

    const dispatch = useDispatch()

    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            dispatch(hideModal())
            dispatch(addButtonClicked(false))
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(hideModal())
        dispatch(addButtonClicked(false))
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
                        storeName: '',
                        address: '',
                        password: ''
                    }}
                    enableReinitialize
                    validationSchema={Yup.object().shape({
                        storeName: Yup.string()
                            .required('ERROR:Required')
                            .min(2, 'ERROR:Must be minimum 2 characters'),

                        address: Yup.string()
                            .required('ERROR:Required'),
                            password: Yup.string().min(8, 'ERROR:Password must be 8 characters long')
                            .matches(/[0-9]/, 'ERROR:Password requires a number')
                            .matches(/[a-z]/, 'ERROR:Password requires a lowercase letter')
                            .matches(/[A-Z]/, 'ERROR:Password requires an uppercase letter')
                            .matches(/[^\w]/, 'ERROR:Password requires a symbol'),
                        confirm_password: Yup.string()
                            .required()
                            .oneOf([Yup.ref("password"), null], "ERROR:Password must match"),
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            const storeData = {
                                storeName: values.storeName,
                                address: values.address,
                                password:values.password
                            }
                            dispatch(startAddStore(storeData))
                            setSubmitting(false)
                            dispatch(hideModal())
                            dispatch(addButtonClicked(false))
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
                                label="Store Name"
                                name="storeName"
                                rules={[{ required: true, message: 'Store name required!' }]}
                            >
                                <Input {...formik.getFieldProps('storeName')} />

                            </Form.Item>
                            <span>
                                {formik.touched.storeName && formik.errors.storeName ? (
                                    <div style={{ color: 'red' }}>{formik.errors.storeName}</div>
                                ) : null}
                            </span>
                            
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Address Required!' }]}
                            >
                                <Input {...formik.getFieldProps('address')} />

                            </Form.Item>
                            <span>
                                {formik.touched.address && formik.errors.address ? (
                                    <div style={{ color: 'red' }}>{formik.errors.address}</div>
                                ) : null}
                            </span>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password {...formik.getFieldProps('password')} />
                            </Form.Item>

                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.password}</div>
                            ) : null}

                            <Form.Item
                                label="Confirm Password"
                                name="confirm_password"
                                rules={[{ required: true, message: 'Please input your confirm_password!' }]}
                            >
                                <Input.Password {...formik.getFieldProps('confirm_password')} />
                            </Form.Item>

                            {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.confirm_password}</div>
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
export default AddStore