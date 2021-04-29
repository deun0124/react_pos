import React, { useState, useEffect } from 'react'

import SalePage from './SalePage'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
function StockPage() {

    const [Products, setProducts] = useState([])
    const [isLoad, setisLoad] = useState(false)
    const [Stocks, setStocks] = useState({

        stock: Products.stock
    })
    useEffect(
        async () => {
            const result = await axios.get('/api/home');
            setProducts(result.data);
            console.log(result.data);
        }

        , [])

    const stateRefresh = async () => {
        const result = await axios.get('/api/home')
        setProducts(result.data);
        console.log(result.data)

    }

    const { stock } = Stocks;
    const handleSave = (id) => {
        axios({
            method: 'POST',
            url: '/api/storage/' + id,
            data: {
                id: id,
                stock: Stocks.stock
            }
        })
        stateRefresh()
    }

    const handleValueChange = (e) => {
        const { name, value } = e.target
        setStocks({
            ...Stocks,
            [name]: value
        })
    }





    return (
        <div>        <Table aria-label="simple table">
            <TableHead>
                <TableRow>

                    <TableCell align="right">상품명</TableCell>
                    <TableCell align="right">바코드</TableCell>
                    <TableCell align="right">가격</TableCell>
                    <TableCell align="right">단가</TableCell>
                    <TableCell align="right">재고</TableCell>
                    <TableCell align="right">설정</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {Products.map((c) => {
                    return (<TableRow key={c.id} >

                        <TableCell align="right" >{c.name}</TableCell>
                        <TableCell align="right">{c.barcode}</TableCell>
                        <TableCell align="right">{c.price}</TableCell>
                        <TableCell align="right">{c.cost}</TableCell>
                        <TableCell align="center"> <TextField id="standard-disabled" defaultValue={c.stock} name="stock" value={stock} onChange={handleValueChange} /></TableCell>

                        <TableCell align="right"><button onClick={(e) => {
                            handleSave(c.id)
                        }} >입고</button></TableCell>
                    </TableRow>

                    )
                })
                }


            </TableBody>
        </Table>



            <SalePage stateRefresh={stateRefresh}/>

        </div>

    );
}

export default StockPage
