import axios from "axios"

export const startGetfilteredMenu = (id) => {
    return (dispatch) => {
        if (id) {
            axios.get(`http://localhost:3004/api/menuItem/showFiltered/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('storetoken')
                }
            })
                .then((filteredMenu) => {
                    dispatch(setMenuData(filteredMenu.data))
                })
        } else {
            axios.get('http://localhost:3004/api/menuItem/showOne', {
                headers: {
                    'Authorization': localStorage.getItem('storetoken')
                }
            })
            .then((filteredMenu) => {
                dispatch(setMenuData(filteredMenu.data))
            })
        }


    }
}

export const startGetSearchData=(str)=>{
    return (dispatch)=>{
        axios.get(`http://localhost:3004/api/menuItem/showSearched/${str}`,{
            headers:{
                'Authorization':localStorage.getItem('storetoken')
            }
        })
        .then((searchData)=>{
            dispatch(setSearchData(searchData.data))
        })
    }
}

export const setSearchData=(data)=>{
    return {
        type:'SET_SEARCH_DATA',
        payload:data
    }
}
export const setMenuData = (data) => {
    return {
        type: 'SET_MENU_DATA',
        payload: data
    }
}

export const reset=()=>{
    return {
        type:'RESET'
    }
}

export const countInc=()=>{
    return {
        type:'INC_COUNT'
    }
}

export const setOrderMessage=(data)=>{
    return {
        type: 'SET_ORDER_MESSAGE',
        payload:data
    }
}

export const setOrderStatus=(data)=>{
    return {
        type: 'SET_ORDER_STATUS',
        payload:data
    }
}