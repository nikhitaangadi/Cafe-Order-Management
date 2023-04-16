import React from 'react'
import { Card, Typography, Button, Divider, Row, Col } from 'antd'
import { useSelector, useDispatch } from "react-redux";
import { addCategoryButtonClicked, addItemButtonClicked, trashButtonClicked, menuButtonClicked } from "../actions/modalAction";
import { showModal } from "../actions/modalAction";
import AddMenuCategory from './AddMenuCategory';
import AddMenuItem from './AddMenuItem';
import StoreCategories from './StoreCategories';
import StoreItems from './StoreItems';
import Trash from './Trash';

const AddMenu = (props) => {

    const { Title } = Typography

    const dispatch = useDispatch()

    const store=useSelector((state)=>{
        return state.store.data
    })
    const storeName=store.map(ele=>ele.storeName).toString()
    const isCategoryClicked = useSelector((state) => {
        return state.modal.addCategoryButtonClicked
    })
    const isItemClicked = useSelector((state) => {
        return state.modal.addItemButtonClicked
    })
    const isMenuClicked = useSelector((state) => {
        return state.modal.menuButtonClicked
    })
    const isShown = useSelector((state) => {
        return state.modal.isShown
    })

    const istrashClicked = useSelector((state) => {
        return state.modal.trashButtonClicked
    })

    const handleCategoryClick = () => {
        dispatch(addCategoryButtonClicked(true))
        dispatch(showModal())
    }

    const handleItemClick = () => {
        dispatch(addItemButtonClicked(true))
        dispatch(showModal())
    }

    const handleTrashClick = () => {
        dispatch(trashButtonClicked(true))
        dispatch(menuButtonClicked(false))
    }

    const handleMenuClick = () => {
        dispatch(trashButtonClicked(false))
        dispatch(menuButtonClicked(true))
    }
    return (
        <Card title={<center><Title>{storeName} Menu Details</Title></center>}>
            <Card type='inner'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='primary' onClick={handleMenuClick}>Menu Items</Button>
                    <Divider type="vertical" />
                    <Button type='primary' onClick={handleCategoryClick}>Add Category</Button>
                    <Divider type="vertical" />
                    <Button type='primary' onClick={handleItemClick}>Add Items</Button>
                    <Divider type="vertical" />
                    <Button type='primary' onClick={handleTrashClick}>Trash</Button>
                </div>
            </Card>

            {isCategoryClicked && isShown && <AddMenuCategory title='Add Category' buttonName='Add Category' />}
            {isItemClicked && isShown && <AddMenuItem title='Add Item' buttonName='Add Item' />}
            {istrashClicked && <div> <Trash /> </div>}
            {isMenuClicked &&
                <Card type='inner' title={<center><Title>Menu Details</Title></center>} style={{ marginTop: '20px' }}>
                    <Row>
                        <Col span={11}>
                            <Card type='inner' title='Categories'>
                                <StoreCategories />
                            </Card>
                        </Col>
                        <Col span={11} offset={1}>
                            <Card type='inner' title='Items'>
                                <StoreItems />
                            </Card>
                        </Col>
                    </Row>

                </Card>
            }
        </Card>
    )
}
export default AddMenu