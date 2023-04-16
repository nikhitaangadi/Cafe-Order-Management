import axios from 'axios';
import Swal from 'sweetalert2';
import {startGetDeletedItem, startGetItem } from './MenuItemAction'

export const startAddCategory = (data) => {
    console.log('Category',data)
    return (dispatch) => {
        axios.post('http://localhost:3004/api/menuCategory/create', data, {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const category = response.data
                if (category.hasOwnProperty('error')) {
                    Swal.fire({
                        title: 'Error!',
                        text: category.error,
                        icon: 'error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Info!',
                        text: 'Category Successfully Added',
                        icon: 'info',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    dispatch(startGetCategory())
                }
            })
    }
}

export const startGetCategory = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/menuCategory/showOne', {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const category = response.data
                dispatch(setCategory(category))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startGetAdminCategory = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3004/api/menuCategory/show/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const category = response.data
                dispatch(setCategory(category))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startGetDeletedCategory = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/menuCategory/showDeleted', {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const category = response.data
                console.log("CATEGORY", category)
                dispatch(setDeletedCategory(category))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


const setDeletedCategory = (data) => {
    return {
        type: 'SET_DELETEDCATEGORY',
        payload: data
    }
}

const setCategory = (data) => {
    return {
        type: 'SET_CATEGORY',
        payload: data
    }
}

export const startRemoveCategory = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3004/api/menuCategory/softDelete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const category = response.data
                console.log('CATE',category)
                Swal.fire({
                    title: 'Category and its items are Successfully Removed!',
                    text: 'You can Retrieve them in Trash',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetCategory())
                dispatch(startGetItem())
                dispatch(startGetDeletedCategory())
                dispatch(startGetDeletedItem())
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startDeleteCategory = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3004/api/menuCategory/delete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const category = response.data
                Swal.fire({
                    title: 'success!',
                    text: 'Category Permanently Deleted',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetCategory())
                dispatch(startGetDeletedCategory())
                dispatch(startGetDeletedItem())
                dispatch(startGetItem())
                
            })
            .catch((err) => {
                alert(err)
            })
    }
}

export const startRestoreCategory = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3004/api/menuCategory/restore/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('storetoken')
            }
        })
            .then((response) => {
                const category = response.data
                Swal.fire({
                    title: 'Success!',
                    text: 'Category and its items are restored Successfully',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetDeletedCategory())
                dispatch(startGetDeletedItem())
                dispatch(startGetItem())
                dispatch(startGetCategory())
                
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}



export const removeCategory = (id) => {
    return {
        type: 'REMOVE_CATEGORY',
        payload: id
    }
}

export const categoryRemove = () => {
    return {
        type: 'CATEGORY_REMOVE'
    }
}