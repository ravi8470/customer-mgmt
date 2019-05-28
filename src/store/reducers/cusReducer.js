const initialState = {
    customers: []
}

const cusReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_CUSTOMER':
            // state.customers.push(action.customer)
            console.log(state)
            return {
                ...state,
                customers: [...state.customers, action.customer]
            }
        case 'EDIT_CUSTOMER':
            let newCus = state.customers.filter(y => y.id !== action.customer.id);
            console.log(newCus);
            return {
                ...state,
                customers:[...newCus, action.customer]
            }
        case 'DELETE_CUSTOMER':
            let newDelCus = state.customers.filter( y => y.id !== action.id)
            return {
                customers: newDelCus
            }
        default: 
            return state;
    }
    
    
}

export default cusReducer;