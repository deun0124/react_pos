import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import StockPage from './component/StockPage'
import RefreshPage from './component/RefreshPage'
import SalePage from './component/SalePage'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Checkbox } from '@material-ui/core';

import Button from '@material-ui/core/Button'

function App() {

  const [Products, setProducts] = useState([])
  const [completed, setCompleted] = useState(0);

  const [isLoad, setisLoad] = useState(false)
 

  
  useEffect(
    //     ()=>{
    //     axios.get('/api/home')
    //     .then(response=>{
    //         if(response.data.success) {
    //             setProducts(response.data);
    //             console.log(response.data)
    //         }else{
    //             alert("db가져오기 실패")
    //         }
    //     })
    // }
    () => {
      let complete = 0;
      let timer = (() => {
        if (complete >= 100) {
          complete = 0
        } else {
          complete += 1;
        }
        setCompleted(complete);
        if (isLoad) {
          clearInterval(timer);
        }
      }, 20);

      callApi().then(res => {
        setProducts(res)
      }).catch(err => console.log(err))
    }

    // async () => {
    //     const result = await axios.get('/api/home');
    //     setProducts(result.data);
    //     console.log(result.data);
    // }

    , [isLoad])

  const callApi = async () => {
    const result = await fetch('/api/home');
    const body = await result.json();
    setisLoad(true)
    return body;
  }


  const stateRefresh = async () => {
    const result = await axios.get('/api/home')
    setProducts(result.data);
    console.log(result.data)


  }







const [checked, setchecked] = useState(true)

const handleCheck=(e)=>{
 
  setchecked(!checked)
  console.log(checked)
}
 
const handleReset = (e) =>{
  axios({
      method : 'POST',
      url :'/api/reset' ,
      
  })
  stateRefresh()

}

const list = Products.map((c) => {
  return <SalePage stateRefresh={stateRefresh} checked={checked}  id={c.id} name={c.name} barcode={c.barcode} price={c.price} cost={c.cost} stock={c.stock} sale={c.sale} profit={c.profit} purchase={c.purchase} />
})
  return (
    <div className="App">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>

            <TableCell align="right">상품명</TableCell>
            <TableCell align="right">바코드</TableCell>
            <TableCell align="right">가격</TableCell>
            <TableCell align="right">단가</TableCell>
            <TableCell align="right">재고</TableCell>
            <TableCell align="right">판매량</TableCell>
            <TableCell align="right">수익</TableCell>
            <TableCell align="right">매입</TableCell>
            <TableCell align="right"><Checkbox checked={!checked} onChange={handleCheck}>설정</Checkbox></TableCell>
          </TableRow>
        </TableHead>
  
            {list}
      </Table>
      <RefreshPage stateRefresh={stateRefresh} />
      <Button onClick={(e)=>{
                    handleReset()
                }}>초기화</Button>
    </div>
  );
}

export default App;
