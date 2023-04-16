import axios from "axios";
import { startGetCategory } from "./categoryAction";
import { startGetItem } from "./MenuItemAction";
import { startGetDeletedCategory } from "./categoryAction";
import { startGetDeletedItem } from "./MenuItemAction";
import { startGetfilteredMenu } from "./homeAction";
import { startGetOrders } from "./orderAction";
import { startGetCompletedOrders } from "./orderAction";
import Swal from "sweetalert2";

export const startLoginStore = (data, props) => {
    return (dispatch) => {
        console.log(data)
        axios.post('http://localhost:3004/api/store/login', data)
            .then((response) => {
                const store = response.data
                if (store.hasOwnProperty('errors')) {
                    Swal.fire({
                        title: 'Info!',
                        text: "City Name and Password doesn't match",
                        icon: 'info',
                        width: '300px',
                        timer: '3000',
                        showConfirmButton: 'false'
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully LogedIn',
                        icon: 'success',
                        width: '300px',
                        timer: '3000',
                        showConfirmButton: false
                    })
                    const token = store.token
                    const count = 0
                    localStorage.setItem('storetoken', token)
                    localStorage.setItem('orderCount', count)
                    dispatch(startGetOneStore())
                    dispatch(startGetCategory())
                    dispatch(startGetItem())
                    dispatch(startGetDeletedCategory())
                    dispatch(startGetDeletedItem())
                    dispatch(startGetfilteredMenu())
                    dispatch(startGetOrders())
                    dispatch(startGetCompletedOrders())
                    props.history.push('/storeHome')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startAddStore = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3004/api/store/create', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const store = response.data
                if (store.hasOwnProperty('error')) {
                    Swal.fire({
                        title: 'Error!',
                        text: store.error,
                        icon: 'error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Info!',
                        text: 'Store Created',
                        icon: 'info',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    dispatch(startGetStore())
                }
            })
    }
}

export const startGetOneStore = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/store/showOne', {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const store = response.data
                dispatch(setStore(store))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startGetStore = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/store/show', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const store = response.data
                dispatch(setStore(store))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startDeleteStore = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3004/api/store/delete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const store = response.data
                if (store.hasOwnProperty('error')) {
                    Swal.fire({
                        title: 'Error!',
                        text: store.error,
                        icon: 'error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Store Deleted',
                        icon: 'success',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    dispatch(startGetStore())
                }
            })
    }
}

const setStore = (data) => {
    return {
        type: 'SET_STORE',
        payload: data
    }
}