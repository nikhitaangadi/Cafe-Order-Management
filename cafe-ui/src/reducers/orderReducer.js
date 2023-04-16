const ordereInitialState={
    data:[],
    completedOrders:[]
}

const orderReducer=(state=ordereInitialState,action)=>{
    switch(action.type){
        case 'SET_ORDERS':{
            return {...state, data:[...action.payload]}
        }
        case 'SET_COMPLETED_ORDERS':{
            return {...state, completedOrders:[...action.payload]}
        }
        case 'REMOVE_ORDER':{
            return {
                ...state,data:[...state.data.filter((ele) => {
                    return ele._id !== action.payload
                })]
            }
        }
        default:{
            return {...state}
        }
    }
}

export default orderReducer