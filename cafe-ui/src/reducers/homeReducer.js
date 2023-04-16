const homeInitialState = {
    menutableData: [],
    searchData: [],
    count: 0,
    orderMessage:'',
    orderStatus:''
}

const homeReducer = (state = homeInitialState, action) => {
    switch (action.type) {
        case 'SET_MENU_DATA': {
            return { ...state, menutableData: [...action.payload] }
        }
        case 'SET_SEARCH_DATA': {
            return { ...state, searchData: [...action.payload] }
        }
        case 'RESET': {
            return { ...state, searchData: [] }
        }
        case 'INC_COUNT': {
            return {...state, count: state.count + 1}
        }
        case 'SET_ORDER_MESSAGE':{
            return {...state, orderMessage:action.payload}
        }
        case 'SET_ORDER_STATUS':{
            return {...state, orderStatus:action.payload}
        }
        default: {
            return { ...state }
        }
    }
}

export default homeReducer