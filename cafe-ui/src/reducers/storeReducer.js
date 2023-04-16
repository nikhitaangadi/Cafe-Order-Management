const storeInitialState = {
    isLoading: true,
    data: [],
    errors: {}
}

const storeReducer = (state = storeInitialState, action) => {
    switch (action.type) {
        case 'SET_STORE': {
            return { ...state, data: [...action.payload] }
        }
        case 'RESET_ALL':{
            return {...state,data:[]}
        }
        default: {
            return { ...state }
        }
    }
}
export default storeReducer