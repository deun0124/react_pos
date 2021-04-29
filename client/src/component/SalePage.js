import axios from 'axios'
import React,{useState, useEffect} from 'react'

function SalePage(props) {

    const [info, setinfo] = useState({
        barcode :''
    })

    const {barcode} =info;
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios({
            url : '/api/sales',
            method : 'post',
            data :{
                barcode :  info.barcode,
            }
        })
        setinfo({
            barcode :''
        })
        props.stateRefresh()
    }

    const handleValueChange=(e)=>{
        const {name, value} = e.target
        setinfo({
            ...info,
            [name] : value
        })

    }
    return (
        <div>
            <input type="text" name="barcode" value={barcode} onChange={handleValueChange}></input>
            <button onClick={handleSubmit} >판매</button>
        </div>
    )
}

export default SalePage
