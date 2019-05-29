const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
if (process.env.JAWSDB_URL == null || process.env.JAWSDB_URL == "") {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'',
        database: 'customer_mgmt',
        port: 3306
    })
}
else{
    var conn = mysql.createConnection(process.env.JAWSDB_URL);
}
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));
const port = process.env.port || 4000;


app.get('/getCustomers', (req, res) => {
    console.log('getCustomers')
    conn.query('SELECT * from customers', (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send(result);
    })
})
app.post('/addCustomer', (req, res) => {
    console.log(req.body);
    req.body.gstin = req.body.gstin.toUpperCase();
    req.body.mobile = parseInt(req.body.mobile);
    conn.query('INSERT into customers SET ?', req.body, (err, result, fields) => {
        if(err){ 
            console.log(err.sqlMessage);
            res.send({'error': err.sqlMessage});
        }
        else{
            console.log('id was : ', result.insertId);
            res.send({'insertId': result.insertId});
        }
        
    })
})

app.post('/editCustomer', (req, res) => {
    console.log(req.body);
    req.body.gstin = req.body.gstin.toUpperCase();
    req.body.mobile = parseInt(req.body.mobile);
    conn.query('UPDATE customers SET name = ? , mobile = ? , address = ? , city = ? , pincode = ? , state = ? , gstin = ? where id = ?',[req.body.name, req.body.mobile, req.body.address, req.body.city, req.body.pincode, req.body.state, req.body.gstin, req.body.id], (err, result) => {
        if(err) throw err;
        res.send({'success': true})
    })
})

app.post('/unique', async (req, res) => {
    console.log(req.body);
    var isMobileUnique, isGstinUnique;
    if(req.body.id != ''){
        conn.query('SELECT COUNT(*) from customers where mobile = ? AND id != ?', [parseInt(req.body.mobile), req.body.id], (err, result) => {
            if(err) throw err;
            isMobileUnique = (result[0]['COUNT(*)'] > 0) ? false : true;
            conn.query('SELECT COUNT(*) from customers where gstin = ? AND id != ?', [req.body.gstin, req.body.id], (err, result) => {
                if(err) throw err;
                isGstinUnique = (result[0]['COUNT(*)'] > 0) ? false : true;
                res.send({
                    'isMobileUnique' : isMobileUnique,
                    'isGstinUnique' : isGstinUnique
                })
            })
        })
    }
    else{
        conn.query('SELECT COUNT(*) from customers where mobile = ?',parseInt(req.body.mobile), (err, result) =>{
            if(err) throw err;
            console.log("mobile unique", result[0]['COUNT(*)']);
            isMobileUnique = (result[0]['COUNT(*)'] > 0) ? false : true;
            conn.query('SELECT COUNT(*) from customers where gstin = ?', req.body.gstin, (err, result2) => {
                if(err) throw err;
                console.log("gstin unique", result2[0]['COUNT(*)']);
                isGstinUnique = (result2[0]['COUNT(*)'] > 0) ? false : true;
                res.send({
                    'isGstinUnique': isGstinUnique,
                    'isMobileUnique': isMobileUnique
                })
            });
        })
    }
        
})

app.post('/delCustomer', (req, res) => {
    console.log(req.body.id)
    conn.query('DELETE from customers WHERE id = ?', req.body.id, (err, result) => {
        if(err) throw err;
        console.log(result.affectedRows)
        if(result.affectedRows == 1){
            res.send({'success': true})
        }
        else{
            res.send({"success": false})
        }
    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})
var portx = process.env.PORT || 4000;
app.listen(portx, () => { console.log( 'server started at port:', portx)});

