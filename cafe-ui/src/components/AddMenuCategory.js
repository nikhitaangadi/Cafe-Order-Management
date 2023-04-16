import React, {useState} from "react";
import 'antd/dist/reset.css';
import { Formik } from 'formik';
import { Card, Typography } from 'antd'
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hideModal } from "../actions/modalAction";
import { addCategoryButtonClicked} from "../actions/modalAction";
import { startAddCategory } from "../actions/categoryAction";
import {
    Button,
    Form,
    Input,
    Radio,
    DatePicker,
    Select,
    Modal
} from 'antd';
const AddMenuCategory = (props) => {
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
            dispatch(addCategoryButtonClicked(false))
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(hideModal())
        dispatch(addCategoryButtonClicked(false))
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
                        categoryName: ''
                    }}
                    enableReinitialize
                    validationSchema={Yup.object().shape({
                        categoryName: Yup.string()
                            .required('ERROR:Required')
                            .min(2, 'ERROR:Must be minimum 2 characters'),
                    })}

                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            const category = {
                                categoryName: values.categoryName,
                            }
                            dispatch(startAddCategory(category))
                            setSubmitting(false)
                            dispatch(hideModal())
                            dispatch(addCategoryButtonClicked(false))
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
                                label="Category Name"
                                name="categoryName"
                                rules={[{ required: true, message: 'Category name required!' }]}
                            >
                                <Input {...formik.getFieldProps('categoryName')} />

                            </Form.Item>
                            <span>
                                {formik.touched.categoryName && formik.errors.categoryName ? (
                                    <div style={{ color: 'red' }}>{formik.errors.categoryName}</div>
                                ) : null}
                            </span>

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
export default AddMenuCategory