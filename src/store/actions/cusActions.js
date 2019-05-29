export const addCustomer = (customer) => {
    return (dispatch, getState) => {
        delete customer.errors;
        delete customer.id;
        delete customer.open;
        console.log(customer);
        fetch('https://cusmg.herokuapp.com/addCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        }).then((res) => {
            return res.json()
        }).then( data => {
            console.log(data);
            if(data.insertId){
                customer.id = data.insertId;
                dispatch({type: 'ADD_CUSTOMER', customer})
            }
            
        })    
    }
}

export const editCustomer = (customer, id) => {
    return (dispatch, getState) => {
        delete customer.errors;
        delete customer.open;
        customer.id = id;
        console.log(customer);
        fetch('https://cusmg.herokuapp.com/editCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        }).then((res) => {
            return res.json()
        }).then( data => {
            console.log(data);
            if(data.success){
                dispatch({type: 'EDIT_CUSTOMER', customer})
            }
            
        })    
    }
}

export const delCustomer = (id) => {
    return (dispatch, getState) => {
        fetch('https://cusmg.herokuapp.com/delCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id': id})
        }).then((res) => {
            return res.json()
        }).then( data => {
            console.log(data);
            if(data.success){
                dispatch({type: 'DELETE_CUSTOMER', id})
            }
            
        })
    }
}