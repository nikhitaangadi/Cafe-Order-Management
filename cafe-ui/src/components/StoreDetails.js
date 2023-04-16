import React, { useState } from 'react'
import { Modal, Typography, Card, Row, Col } from 'antd'

import { useSelector, useDispatch } from 'react-redux'
import { showButtonClicked, hideModal } from '../actions/modalAction';
import AdminMenu from './AdminMenu';
import AdminStoreOrdes from './AdminStoreOrders';

const StoreDetails = (props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const dispatch = useDispatch()

    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        dispatch(hideModal())
        dispatch(showButtonClicked(false))
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        dispatch(hideModal())
        dispatch(showButtonClicked(false))
    };

    const { Title } = Typography
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return (
        <Modal
            open={isShown}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width='100%'
        >
            <Card title='Store Detail'>
                <Row>
                    <Col span={8}><AdminMenu /></Col>
                    <Col span={14} offset={1}><AdminStoreOrdes /></Col>
                </Row>
            </Card>
        </Modal>
    )
}
export default StoreDetails