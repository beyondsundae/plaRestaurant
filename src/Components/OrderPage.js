import React, {useState, useEffect} from 'react'
import axios from 'axios'

const OrderPage =()=> {

    const [Data, setData] = useState([])

    const getOrder =()=>{
        axios.get('http://localhost:4000//Data')
            .then((res)=>{
                console.log(res)
            })
    }

    useEffect(()=>{
        axios.get('http://localhost:4000/Data')
        .then((res)=>{
            const data = res.data
            console.log(data)
            setData(data)
        })

    }, [])
    return (
        <div  style={{height: "auto", marginTop: "30vh"}}>
            {Data.map((item, index)=>{
                console.log(item)
                return(
                    <div key={index}>
                         <div className="card mx-auto" style={{width: "50%"}}>
                            <div className="card-header">
                               ORDER: {item.Order}
                            </div>

                            <div className="card-body">
                               <strong>Time: </strong> {item.Timestamp} <br/>
                               <strong>Price: </strong> {item.totalPrice} <br/>
                               <strong>Status: </strong>: {item.status} <br/>
                            </div>
                         </div>
                    </div>
                   
                )
               

            })}
            
        </div>
    )
}

export default OrderPage
