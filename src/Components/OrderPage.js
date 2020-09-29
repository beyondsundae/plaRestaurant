import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

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
            <div className='container-fluid py-2'style={{height: "auto", background: "#3f7db5", color: "white"}} >
                <h1>Order</h1>
            </div>

            <div className='container-fluid mt-2' style={{height: "85vh"}}>
                <div className="row">
                    <div className='col-5'>
                        <h2 className="my-2">รายการอาหารที่รอทำ</h2>
                        <Accordion defaultActiveKey={1} >
                        {Data.map((item, index)=>{
                            //console.log(item)
                            return(
                                item.status === "NotDone"?
                                (
                                    <Card>
                                        <Card.Header >
                                            <Accordion.Toggle className="container-fluid " as={Button} variant="text" eventKey={index+1}>
                                                <div className="row">
                                                    <div className="col-4" >
                                                        <h4>รายการที่: {item.Order}</h4> 
                                                    </div>
                                                    <div className="col text-right">
                                                        <h4>{item.EatStatus=="Store"? "กินที่ร้าน":"สั่งกลับบ้าน"}</h4> 
                                                    </div>
                                                    
                                                </div>
                                                
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={index+1}>
                                            
                                            <Card.Body>
                                                <strong>เวลาที่สั่ง: </strong> {item.Timestamp} <br/>
                                                
                                                {/*<strong>ราคา: </strong> {item.totalPrice} <br/>*/}
                                                <hr/>
                                                <strong>รายการที่สั่ง</strong><br/>
                                                <div className="ml-3 ">
                                                    {item.ข้าวสวย != "0"?(<h3>ข้าวสวย: {item.ข้าวสวย}<br/></h3>):null}
                                                    {item.ข้าวผัดไก่ != "0"?(<h3>ข้าวผัดไก่: {item.ข้าวผัดไก่}<br/></h3>):null}
                                                    {item.ข้าวกะเพราไก่สับ != "0"?(<h3>ข้าวกะเพราไก่สับ: {item.ข้าวกะเพราไก่สับ}<br/></h3>):null}
                                                    {item.ข้าวผัดพริกแกงไก่ != "0"?(<h3>ข้าวผัดพริกแกงไก่: {item.ข้าวผัดพริกแกงไก่}<br/></h3>):null}
                                                    {item.ข้าวไก่ผัดผงกะหรี่ != "0"?(<h3>ข้าวไก่ผัดผงกะหรี่: {item.ข้าวไก่ผัดผงกะหรี่}<br/></h3>):null}
                                                    {item.ข้าวทะเลผัดผงกะหรี่ != "0"?(<h3>ข้าวทะเลผัดผงกะหรี่: {item.ข้าวทะเลผัดผงกะหรี่}<br/></h3>):null}
                                                    {item.ข้าวต้มไก่ != "0"?(<h3>ข้าวต้มไก่: {item.ข้าวต้มไก่}<br/></h3>):null}
                                                    {item.ข้าวไข่เจียว != "0"?(<h3>ข้าวไข่เจียว: {item.ข้าวไข่เจียว}<br/></h3>):null}
                                                    {item.ข้าวไก่ทอด!= "0"?(<h3>ข้าวไก่ทอด: {item.ข้าวไก่ทอด}<br/></h3>):null}
                                                    {item.ข้าวผัดหมู != "0"?(<h3>ข้าวผัดหมู: {item.ข้าวผัดหมู}<br/></h3>):null}
                                                    {item.ข้าวกะเพราหมูสับ !== "0"?(<h3>ข้าวกะเพราหมูสับ: {item.ข้าวกะเพราหมูสับ}<br/></h3>):null}
                                                    {item.ข้าวผัดพริกแกงหมู != "0"?(<h3>ข้าวผัดพริกแกงหมู: {item.ข้าวผัดพริกแกงหมู}<br/></h3>):null}
                                                    {item.ข้าวผัดพริกแกงหมูกรอบ != "0"?(<h3>ข้าวผัดพริกแกงหมูกรอบ: {item.ข้าวผัดพริกแกงหมูกรอบ}<br/></h3>):null}
                                                    {item.ข้าวหมูผัดผงกะหรี่ != "0"?(<h3>ข้าวหมูผัดผงกะหรี่: {item.ข้าวหมูผัดผงกะหรี่}<br/></h3>):null}
                                                    {item.ข้าวต้มหมู != "0"?(<h3>ข้าวต้มหมู: {item.ข้าวต้มหมู}<br/></h3>):null}
                                                    {item. ข้าวไข่เจียวหมูสับ != "0"?(<h3> ข้าวไข่เจียวหมูสับ: {item. ข้าวไข่เจียวหมูสับ}<br/></h3>):null}
                                                </div>
                                               
                                                <hr/>
                                                
                                                <div className="row">
                                                    <div className="col-8 ">
                                                        <strong>ราคา: <h1 className="ml-3">{item.totalPrice}</h1></strong> 
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <button className="btn btn-info btn-lg" onClick={()=>cancelOrder()}>ตรวจสอบ</button>
                                                    </div>
                                                </div>
                                                

                                            </Card.Body>
                                            
                                        </Accordion.Collapse>
                                        
                                    </Card>
                                )
                                :null
                            )
                        })}
                        </Accordion>
                    </div>

                    <div className='col-2'>
                        <div className="row ">
                            <div className="col pl-5 text-right">
                                <div style={{border: "1px solid red", background: "red", height: "200vh", width: "1vh", marginLeft:"7vh"}}/>
                            </div>
                            
                            <div className="col pr-5">
                                <div style={{border: "1px solid red", background: "red", height: "200vh", width: "1vh"}}/>
                            </div>
                        </div>
                    </div>

                    <div className='col-5'>
                    <h2>รายการอาหารที่ทำเสร็จเเล้ว</h2>
                    
                        {Data.map((item, index)=>{
                                console.log(item)
                                return(
                                    item.status === "Done"?
                                    (<div key={index}>
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
                                    </div>)
                                    :null
                                )
                            })}
                    
                    </div>
                </div>
            </div>
            
                
            
        </div>
    )
}

export default OrderPage
