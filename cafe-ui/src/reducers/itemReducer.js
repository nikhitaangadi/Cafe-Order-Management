const itemInitialState = {
    isLoading: true,
    data: [],
    deletedItem:[],
    errors: {}
}

const itemReducer = (state = itemInitialState, action) => {
    switch (action.type) {
        case 'SET_ITEM': {
            return { ...state, data: [...action.payload] }
        }
        case 'SET_DELETEDITEM':{
            return {...state, deletedItem: [...action.payload]}
        }
        case 'UPDATE_ITEM': {
            return {
                ...state, data: [...state.data.map((ele) => {
                    if (ele._id === action.payload.id) {
                        return { ...ele, ...action.payload.body }
                    } else {
                        return { ...ele }
                    }
                })]
            }
        }
        case 'REMOVE_ITEM':{
            return {...state,data:[]}
        }
        case 'RESET_ALL':{
            return {...state,data:[]}
        }
        default: {
            return { ...state }
        }
    }
}
export default itemReducer