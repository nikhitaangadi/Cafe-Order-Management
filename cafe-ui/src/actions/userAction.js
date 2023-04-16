import axios from 'axios'
import Swal from 'sweetalert2'
import { startGetStore } from './StoreAction'

export const startLoginUser = (data, props) => {
    return (dispatch) => {
        console.log(data)
        axios.post('http://localhost:3004/api/user/login', data)
            .then((response) => {
                const user = response.data
                if (user.hasOwnProperty('errors')) {
                    Swal.fire({
                        title: 'Info!',
                        text: "Email and Password doesn't match",
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
                    const token = user.token
                    localStorage.setItem('token', token)
                    dispatch(startGetUser())
                    dispatch(startGetStore())
                    props.history.push('/adminHome')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startGetUser = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/user/account', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                localStorage.setItem('role',result.role)
                const userInfo = {
                    userId: result._id,
                    username: result.username,
                    email: result.email,
                    role:result.role
                }
                dispatch(setUser(userInfo))

            })
    }
}

const setUser = (data) => {
    return {
        type: 'SET_USER',
        payload: data
    }
}