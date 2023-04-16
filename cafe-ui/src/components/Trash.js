import React from "react";
import { Typography, Card, Row, Col } from "antd";
import TrashCategories from "./TrashCategories";
import TrashItems from "./TrashItems";

const Trash = (props) => {

    const { Title } = Typography

    return (
        <Card type='inner' >
            <Row>
                <Col span={11}>
                    <Card type='inner' title={<Title>Categories</Title>}>
                        <TrashCategories />
                    </Card>
                </Col>
                <Col span={11} offset={1}>
                    <Card type='inner' title={<Title>Items</Title>}>
                        <TrashItems />
                    </Card>
                </Col>
            </Row>

        </Card>
    )
}
export default Trash