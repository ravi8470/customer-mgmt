import React, {Component} from 'react';
import {addCustomer} from '../store/actions/cusActions';
import {editCustomer} from '../store/actions/cusActions';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';  
import Container from '@material-ui/core/Container';

class CusForm extends Component {
  state = {
      name: '',
      mobile: '',
      address: '',
      city: '',
      pincode: '',
      state: '',
      gstin: '',
      errors: [],
      open: false
    }
  handleClickOpen = () =>{
    this.setState({
      open:true,
      errors:[]
    })
  }

  handleClose = ()=> {
    this.setState({
      open:false
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      errors: []
    })
    var isUnique;
    let newErr = [];
    await fetch('https://cusmg.herokuapp.com/unique', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'mobile': (this.state.mobile === '' ? this.props.inputs.mobile : this.state.mobile), 'gstin': (this.state.gstin === '' ? this.props.inputs.gstin : this.state.gstin),'id': (this.props.inputs ? this.props.inputs.id : '')})
    }).then(resp => resp.json()).then(data => isUnique = data)
    console.log(isUnique);
    if(!isUnique.isGstinUnique){
      newErr.push('The GSTIN provided already exists');
    }
    if(!isUnique.isMobileUnique){
      newErr.push('The Mobile Number provided already exists');
    }
    if(this.state.name.trim().length === 0){
      newErr.push('Name entered is invalid')
    }
    if(newErr.length === 0){
      if(this.props.inputs){
        this.setState({
          name: (this.state.name === '') ? this.props.inputs.name : this.state.name,
          mobile: (this.state.mobile === '') ? this.props.inputs.mobile : this.state.mobile,
          address: (this.state.address === '') ? this.props.inputs.address : this.state.address,
          city: (this.state.city === '') ? this.props.inputs.city : this.state.city,
          pincode: (this.state.pincode === '') ? this.props.inputs.pincode : this.state.pincode,
          state: (this.state.state === '') ? this.props.inputs.state : this.state.state,
          gstin: (this.state.gstin === '') ? this.props.inputs.gstin : this.state.gstin
        }, () => {
          this.props.updateCustomer(this.state, this.props.inputs.id);
          this.handleClose();    
        })
      }
      else{
        this.props.createCustomer(this.state);
        this.handleClose();
      }
      
    }
    else{
      this.setState({
        errors: newErr
      })
      document.getElementById('errorsDiv').focus()
    } 
  }
  render () {
    return (
    <>  
      <Button variant="contained" size="large" color="primary" onClick={this.handleClickOpen}>{(this.props.inputs)?'Edit' :'Add Customer'}</Button>
      <Container maxWidth='xl'>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{(this.props.inputs)?'Edit Customer' :'Enter Details'}</DialogTitle>
        <DialogContent>
          <div tabIndex='0' id='errorsDiv'>
            {this.state.errors && this.state.errors.map((err,i) => {
              return (<p key={i} style={{'color':'red'}} >{err}</p>)
            })}
          </div>
          <form className='demoForm' onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Customer Name:</label>
              <input type='text' className='form-control' onChange={this.handleChange} name='name' pattern='[a-zA-Z ]{3,40}' defaultValue={(this.props.inputs)? this.props.inputs.name : ''} title='Should be between 3 to 40 chars. Can only contain alphabets' required/>
            </div>
            <div className='form-group '>
              <label htmlFor='mobile'>Mobile:</label>
              <input type='number' className='form-control' onChange={this.handleChange} name='mobile' min="1000000000" max="9999999999" defaultValue={(this.props.inputs)? this.props.inputs.mobile : ''} required/>
            </div>
            <div className='form-group '>
              <label htmlFor='address'>Address:</label>
              <textarea className='form-control' onChange={this.handleChange} name='address' minLength='10' defaultValue={(this.props.inputs)? this.props.inputs.address : ''} required/>
            </div>
            <div className='form-group'>
              <label htmlFor='city'>City:</label>
              <input type='text' className='form-control' onChange={this.handleChange} name='city' pattern='[A-Za-z0-9 &]{2,45}' title='please provide a valid city name' defaultValue={(this.props.inputs)? this.props.inputs.city : ''} required/>
            </div>
            <div className='form-group'>
              <label htmlFor='pincode'>Pincode:</label>
              <input type='number' className='form-control' onChange={this.handleChange} name='pincode' min='100000' max='999999' defaultValue={(this.props.inputs)? this.props.inputs.pincode : ''} required/>
            </div>
            <div className='form-group'>
              <label htmlFor='state'>State:</label>
              <select name="state" className='form-control' onChange={this.handleChange} defaultValue={(this.props.inputs)? this.props.inputs.state : ''}>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Orissa">Orissa</option>
                <option value="Pondicherry">Pondicherry</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttaranchal">Uttaranchal</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='gstin'>GSTIN:</label>
              <input type='text' className='form-control' onChange={this.handleChange} name='gstin' pattern='[A-Za-z0-9]{15}' title='must have exactly 15 alpha-numeric chars' defaultValue={(this.props.inputs)? this.props.inputs.gstin : ''} required/>
            </div>
            <div className='form-group '>
                <button type='submit' className='form-control btn btn-primary'>{(this.props.inputs)?'Save Changes' :'Add Customer'}</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      </Container>
    </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCustomer: (customer) => {console.log(customer);dispatch(addCustomer(customer))},
    updateCustomer: (customer, id) => {console.log(customer);dispatch(editCustomer(customer, id))}
  }
}
export default connect(null,mapDispatchToProps)(CusForm);