import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Form, Input, Card } from 'antd';
import { useDispatch } from "react-redux";
import { startLoginStore } from "../actions/StoreAction";

const Store=(props)=>{
    const [form] = Form.useForm();
    const { Title } = Typography
    const dispatch = useDispatch()
    return (

        <div style={{ backgroundColor: 'burlywood', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100vh' }}>
            <Card title={<Title strong >STORE LOGIN FORM</Title>} style={{ height: '50vh', width: '60vh', backgroundColor: 'beige', alignItems:'center' }}>
                <Formik
                    initialValues={{ cafeName: '', password: '' }}
                    validationSchema={Yup.object({
                        cafeName: Yup.string().required('Required'),
                        password: Yup.string().min(8, 'Password must be 8 characters long').required('Required')
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            const userData = {
                                storeName: values.cafeName,
                                password: values.password
                            }
                            dispatch(startLoginStore(userData, props))
                            setSubmitting(false);
                            form.resetFields();
                        }, 400);
                    }}
                >
                    {formik => (
                        <Form onFinish={formik.handleSubmit}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                                justifyContent: 'center',
                                fontFamily: 'sans-serif',
                            }}
                            initialValues={{
                                remember: true,
                            }}
                        >

                            <Form.Item
                                label="Cafe Name"
                                name="cafeName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your cafeName!',
                                    },
                                ]}
                            >
                                <Input {...formik.getFieldProps('cafeName')} />
                            </Form.Item>

                            {formik.touched.cafeName && formik.errors.cafeName ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.cafeName}</div>
                            ) : null}

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password {...formik.getFieldProps('password')} />
                            </Form.Item>

                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: 'red', marginLeft: '150px' }}>{formik.errors.password}</div>
                            ) : null}

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>

    )
}
export default Store