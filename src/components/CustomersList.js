import React from 'react';
import {connect} from 'react-redux';
import CusForm from './CusForm';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {delCustomer} from '../store/actions/cusActions';

const CustomersList = (props) => {
    const handleDelete = (id) => {
        console.log(id);
        props.deleteCustomer(id)
    }
    const list = props.list
    return(
        <div className='customerContainer'>
        {list.map(item => {
            return (
                <Card key={item.id} className='customerCard'>
                    <CardContent>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Mobile:</strong> {item.mobile}</p>
                        <p><strong>City:</strong> {item.city}</p>
                        <p><strong>State:</strong> {item.state}</p>
                        <p><strong>GSTIN:</strong> {item.gstin}</p> 
                    </CardContent>
                    <CardActions>
                        <CusForm inputs={item} />
                        <Button onClick={() =>{ return handleDelete(item.id)}} variant='contained' size='large' color='secondary'>Delete</Button>
                    </CardActions>
                </Card>
            )
        })}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        list: state.customers
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        deleteCustomer: (id) => { console.log(id); dispatch(delCustomer(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersList);