import React from 'react';
import './App.css';
import CusForm from './components/CusForm';
import CustomersList from './components/CustomersList';

function App(props) {
  return (
    <div className="App">
      <h2 style={{'textAlign':'center'}}>Customer Mgmt Portal</h2>
      <div style={{'textAlign':'center'}}><CusForm /></div><hr/>
      <h3 style={{'display':'inline-block', 'borderBottom': '1px solid red','marginTop':'0'}}>List of Customers:</h3><br/>
      <CustomersList />
    </div>
  );
}

export default App;
