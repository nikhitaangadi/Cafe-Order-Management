import axios from 'axios'
import { startGetCategory } from './categoryAction'
import Swal from 'sweetalert2'

export const startAddItem = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3004/api/menuItem/create', data, {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const item = response.data
                if (item.hasOwnProperty('error')) {
                    Swal.fire({
                        title: 'Error!',
                        text: item.error,
                        icon: 'Error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item Successfully Added',
                        icon: 'success',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    dispatch(startGetItem())
                }
            })
    }
}

export const startGetItem = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/menuItem/showOne', {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const item = response.data
                dispatch(setItem(item))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startGetAdminItem = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3004/api/menuItem/show/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const item = response.data
                dispatch(setItem(item))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const setItem = (data) => {
    return {
        type: 'SET_ITEM',
        payload: data
    }
}

export const startUpdateItem = (id, data) => {
    return (dispatch) => {

        axios.put(`http://localhost:3004/api/menuItem/update/${id}`, data, {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const updatedItem = response.data
                if (updatedItem.hasOwnProperty('errors')) {
                    Swal.fire({
                        title: 'Error!',
                        text: updatedItem.errors,
                        icon: 'error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item Successfully Updated',
                        icon: 'success',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    const itemId = updatedItem._id
                    dispatch(updateItem(itemId, updatedItem))
                }
            })
    }
}


export const startSoftDeleteItem = (id) => {
    return (dispatch) => {
        
        axios.delete(`http://localhost:3004/api/menuItem/softDelete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const softDeleteResponse = response.data
                if (softDeleteResponse.hasOwnProperty('error')) {
                    Swal.fire({
                        title: 'Error!',
                        text: softDeleteResponse.error,
                        icon: 'Error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Item Successfully Deleted!',
                        text: 'You can Retrieve it from Settings.',
                        icon: 'success',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    dispatch(startGetItem())
                    dispatch(startGetDeletedItem())
                }
            })
    }
}

const updateItem = (id, body) => {
    return {
        type: 'UPDATE_ITEM',
        payload: {
            id: id,
            body: body
        }
    }
}

export const removeItem = () => {
    return {
        type: 'REMOVE_ITEM'
    }
}

export const startGetDeletedItem = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/menuItem/showDeleted', {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const item = response.data
                dispatch(setDeletedItem(item))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const setDeletedItem = (data) => {
    return {
        type: 'SET_DELETEDITEM',
        payload: data
    }
}

export const startRestoreItem = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3004/api/menuItem/restore/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const item = response.data
                Swal.fire({
                    title: 'Success!',
                    text: 'Item Restored Successfully',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetDeletedItem())
                dispatch(startGetItem())
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startDeleteItem = (id) => {
    return (dispatch) => {

        axios.delete(`http://localhost:3004/api/menuItem/delete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const Response = response.data
                Swal.fire({
                    title: 'Success!',
                    text: 'Item Successfully Deleted Permanantly',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetCategory())
                dispatch(startGetItem())
                dispatch(startGetDeletedItem())
            })
            .catch((err) => {
                alert(err)
            })
    }
}