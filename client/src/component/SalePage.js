import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import RefreshPage from './RefreshPage'
import Button from '@material-ui/core/Button'
function SalePage(props) {

   

    const [Stocks, setStocks] = useState({

        stock: props.stock
    })

    
    

    
    const { stock } = Stocks;
    const handleSave = (id) => {
        axios({
            method: 'POST',
            url: '/api/storage/' + id,
            data: {
                id: id,
                stock: Stocks.stock
            }

        }).then(props.stateRefresh())
        console.log(props.checked)
    }

    const handleValue = (e) => {
        const { name, value } = e.target
        setStocks({
            ...Stocks,
            [name]: value
        })
    }

    const handleReset = (id) =>{
        axios({
            method : 'POST',
            url :'/api/reset/' +id,
            data : {
                id :id
            }
        }).then(props.stateRefresh())

    }

console.log(props.checked)

    return (

        <>
            
                <TableRow key={props.id} >

                    <TableCell align="right" >{props.name}</TableCell>
                    <TableCell align="right">{props.barcode}</TableCell>
                    <TableCell align="right">{props.price}</TableCell>
                    <TableCell align="right">{props.cost}</TableCell>
                    <TableCell align="center">
                        {props.checked != true ?  <TextField placeholder="현재 재고 입력" disabled={props.checked}  name="stock" value={stock} onChange={handleValue} /> :  props.stock }
                       </TableCell>
                    <TableCell align="right">{props.sale}</TableCell>
                    <TableCell align="right">{props.profit}</TableCell>
                    <TableCell align="right">{props.purchase}</TableCell>

                    <TableCell align="right"><button onClick={(e) => {
                        handleSave(props.id)
                    }} >입고</button></TableCell>
                </TableRow>
                <Button onClick={(e)=>{
                    handleReset(props.id)
                }}>판매관리</Button>

          
          
      

           
        </>
    )
}

export default SalePage
