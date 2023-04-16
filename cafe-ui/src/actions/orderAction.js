import axios from "axios";

export const startCreateOrder=(data)=>{
    return (dispatch)=>{
        console.log(data)
        axios.post('http://localhost:3004/api/order/create',data,{
            headers:{
                'Authorization':localStorage.getItem('storetoken')
            }
        })
        .then((order)=>{
            dispatch(startGetOrders())
        })
    }
}

export const startGetOrders=()=>{
    return (dispatch)=>{
        axios.get('http://localhost:3004/api/order/showByStore',{
            headers:{
                'Authorization':localStorage.getItem('storetoken')
            }
        })
        .then((orders)=>{
            dispatch(setOrder(orders.data))
        })
    }
}

export const startGetCompletedOrders=()=>{
    return (dispatch)=>{
        axios.get('http://localhost:3004/api/order/showCompleted',{
            headers:{
                'Authorization':localStorage.getItem('storetoken')
            }
        })
        .then((orders)=>{
            dispatch(setCompletedOrder(orders.data))
        })
    }
}

export const startGetAdminOrders=(id)=>{
    return (dispatch)=>{
        axios.get(`http://localhost:3004/api/order/showAll/${id}`,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then((orders)=>{
            dispatch(setOrder(orders.data))
        })
    }
}

export const startGetAdminCompletedOrders=(id)=>{
    return (dispatch)=>{
        axios.get(`http://localhost:3004/api/order/showAdminOrder/${id}`,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        .then((orders)=>{
            dispatch(setCompletedOrder(orders.data))
        })
    }
}

export const startOrderSoftDelete=(id)=>{
    return (dispatch)=>{
        axios.delete(`http://localhost:3004/api/order/softDelete/${id}`,{
            headers:{
                'Authorization':localStorage.getItem('storetoken')
            }
        })
        .then((order)=>{
            if(order){
                dispatch(startGetOrders())
            }
            
        })
    }
}

export const startDeleteAllOrders=()=>{
    return (dispatch)=>{
        axios.delete(`http://localhost:3004/api/order/delete`,{
            headers:{
                'Authorization':localStorage.getItem('storetoken')
            }
        })
        .then((order)=>{
            if(order){
                dispatch(startGetCompletedOrders())
                dispatch(startGetOrders())
                const count=0
                localStorage.setItem('orderCount', count)
            }
            
        })
    }
}

export const setOrder=(data)=>{
    return {
        type:'SET_ORDERS',
        payload:data
    }
}

export const setCompletedOrder=(data)=>{
    return {
        type:'SET_COMPLETED_ORDERS',
        payload:data
    }
}