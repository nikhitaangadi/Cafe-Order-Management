import React from "react";
import { Typography } from 'antd'
import coffeeImg from './coffeeImg.jpg'

const MainPage = (props) => {
    const { Title, Text } = Typography
    return (
        <div style={{
            backgroundImage: `url(${coffeeImg}`, height: '100vh', height: '100vh',
            fontSize: '50px',
            backdropFilter: 'blur(8px)',
           
            
        }}>
            <center><Title level={1} style={{ backgroundColor: 'bisque', position:'absolute',
            top: '40%',
            left:'24%',
            fontSize:'80px',
            fontFamily:'cursive'
             }}>Cafe Order Management</Title></center>
        </div>
    )
}
export default MainPage