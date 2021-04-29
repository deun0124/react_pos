import React,{useState, useEffect} from 'react'
import axios from 'axios'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
function RefreshPage(props) {
    const [info, setinfo] = useState({
        barcode: ''
    })
    const { barcode } = info;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            // url : '/api/sales/' + barcode,
            url: '/api/home/' + barcode,
            method: 'post',
            data: {
                barcode: info.barcode,
            }
        })
            .then((response) => {
                console.log(response.data)
                
                props.stateRefresh();
            })
        setinfo({
            barcode: ''
        })

    }



    const handleValueChange = (e) => {
        const { name, value } = e.target
        setinfo({
            ...info,
            [name]: value
        })

    }

    return (
        <>
        {/* <TableRow style={{ display : 'flex', alignItems : 'center', justifyContent:'center'}} > 
          </TableRow> */}
              <input type="text" name="barcode" value={barcode} onChange={handleValueChange}></input>
            <button onClick={handleSubmit} >판매</button>
         
        </>
    )
}

export default RefreshPage
