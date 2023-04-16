const modalInitialState={
    isShown:false,
    addButtonClicked:false,
    addCategoryButtonClicked:false,
    addItemButtonClicked:false,
    editButtonClicked:false,
    trashButtonClicked:false,
    menuButtonClicked:true,
    showButtonClicked:false,
    data:{}
}

const modalReducer=(state=modalInitialState,action)=>{
    switch(action.type){
        case 'SHOW_MODAL':{
            return {...state,isShown:true}
        }
        case 'CLOSE_MODAL':{
            return {...state,isShown:false}
        }
        case 'ADD_BUTTON_CLICKED':{
            return {...state, addButtonClicked:action.payload}
        }
        case 'ADD_CATEGORY_BUTTON_CLICKED':{
            return {...state, addCategoryButtonClicked:action.payload}
        }
        case 'ADD_ITEM_BUTTON_CLICKED':{
            return {...state, addItemButtonClicked:action.payload}
        }
        case 'EDIT_BUTTON_CLICKED':{
            return {...state, editButtonClicked:action.payload}
        }
        case 'TRASH_BUTTON_CLICKED':{
            return {...state, trashButtonClicked:action.payload}
        }
        case 'MENU_BUTTON_CLICKED':{
            return {...state, menuButtonClicked:action.payload}
        }
        case 'SHOW_BUTTON_CLICKED':{
            return {...state, showButtonClicked:action.payload}
        }
        case 'SET_EDIT_DATA':{
            return {...state, data:action.payload}
        }
        case 'REMOVE_EDIT_DATA':{
            return {...state,data:{}}
        }
        case 'RESET_ALL':{
            return {modalInitialState}
        }
        default:{
            return {...state}
        }
    }
}

export default modalReducer