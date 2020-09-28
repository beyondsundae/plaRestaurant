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

    const cancelOrder =()=>{
        if (window.confirm("ยืนยันอาหาร")) {
            alert("เก็บข้อมูลสำเร็จ")
        } else {
           alert("รายการนี้ยกเลิก")
        }
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
        <div className="OrderPage" >
            <div className='container-fluid'style={{height: "auto"}} >
                <h1>Order</h1>
            </div>

            <div className='container-fluid' style={{height: "85vh"}}>
                <div className="row">
                    <div className='col-5'>
                        {Data.map((item, index)=>{
                            console.log(item)
                            return(
                                <div key={index}>
                                    <div className="card mx-auto mb-3" style={{width: "95%"}}>
                                        <div className="card-header">
                                        ORDER: {item.Order} <br/>
                                        TABLE: 
                                        </div>

                                        <div className="card-body">
                                        <strong>Time: </strong> {item.Timestamp} <br/>
                                        <strong>Price: </strong> {item.totalPrice} <br/>
                                        <strong>Status: </strong>: {item.status} <br/>
                                        </div>

                                        <div className="card-footer text-right">
                                            <button className="btn btn-info" onClick={()=>cancelOrder()}>ตรวจสอบ</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className='col-2'>
                        <div className="row ">
                            <div className="col pl-5 text-right">
                                <div style={{border: "1px solid red", background: "red", height: "100vh", width: "1vh", marginLeft:"7vh"}}/>
                            </div>
                            
                            <div className="col pr-5">
                                <div style={{border: "1px solid red", background: "red", height: "100vh", width: "1vh"}}/>
                            </div>
                        </div>
                    </div>

                    <div className='col-5'>
                        {Data.map((item, index)=>{
                                console.log(item)
                                return(
                                    <div key={index}>
                                        <div className="card mx-auto mb-3" style={{width: "95%"}}>
                                            <div className="card-header">
                                            ORDER: {item.Order} <br/>
                                            TABLE: 
                                            </div>

                                            <div className="card-body">
                                            <strong>Time: </strong> {item.Timestamp} <br/>
                                            <strong>Price: </strong> {item.totalPrice} <br/>
                                            <strong>Status: </strong>: {item.status} <br/>
                                            </div>

                                            <div className="card-footer text-right">
                                                <button className="btn btn-info" onClick={()=>cancelOrder()}>ตรวจสอบ</button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage
