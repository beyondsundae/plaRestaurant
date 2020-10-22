import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Swal from 'sweetalert2'
import moment from 'moment';

const OrderPage =()=> {

    var dateFormat = require('dateformat');
    var now = new Date();
    const timeStamp =  dateFormat(now, "dd-mm-yyyy,")
    const [ClockNow, setClockNow] = useState(moment().format('HH:mm:ss'));

    const LockPic = "https://images.vexels.com/media/users/3/132074/isolated/preview/0117cb0129593faa02646a8277ca80e3-security-lock-icon-by-vexels.png"

    const [Auth, setAuth] = useState(false)
    const [PIN, setPIN] = useState()

    const [Data, setData] = useState([])

    const [ActiveKey, setActiveKey] = useState()

    const confirmOrder =(item)=>{
        //setTime4Accept()
        // if (window.confirm("ยืนยันอาหาร")) {
        //     setTimeout(()=>{
        //       alert("เก็บข้อมูลสำเร็จ") 
        //       GetData()
        //     }, 2000)
        //     Accept(item) 
        // } else {
        //    alert("รายการนี้ยกเลิก")
        // }
        Swal.fire({
            title: "รายการอาหารนี้ทำเสร็จแล้วใช่หรือไม่",
            icon: "question",
            reverseButtons: true,
            showConfirmButton: true,
            confirmButtonText: "ยืนยัน",
            
            confirmButtonColor: "#008a43",
            showCancelButton: true,
            cancelButtonText: "ยังไม่เสร็จ",
            cancelButtonColor: "",
        })
        .then((result)=>{
            if(result.isConfirmed){
                Swal.fire({
                    title: "ยืนยันเรียบร้อย",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                })
                
                    Accept(item) 
                    
                    setTimeout(()=>{
                        GetData()
                    }, 1600)
            }
            else{

            }
        })
    }

    const Accept =(item)=>{
        let Accept = {
            OrderCook: item.OrderCook,
            statusCook:"Done"
        }

        axios.put('http://localhost:4000/AcceptOrder', Accept)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const GetData =()=>{
        axios.get('http://localhost:4000/Data')
        .then((res)=>{
            const data = res.data
            console.log(data)
            setData(data)
        })

    }

    const GetActiveKeyFunction =()=>{
        let result ={}
            for ( let i = 0; i < Data.length; i++) {
                if (Data[i].statusCook == "NotDone") {
                result = Data[i]
                break
            }
            }
            return result
        //console.log(result.OrderCook)

        // setTimeout(() => {
            
        // }, 3000);
        
        //setActiveKey(result.OrderCook)
    }
    
    const keyy = GetActiveKeyFunction().OrderCook

    const GetKey =()=>{
        axios.get("http://localhost:4000/ActiveKey")
            .then((res)=>{
                const result = res.data
                console.log(result)
                setActiveKey(result)
            })
    }
    
    const ttt =()=>{
        ActiveKey.map((item)=>{
            console.log(item)

            //return item
        })
    }

    const EnterPIN =(e)=>{
        //console.log(e.target.value)
        setPIN(e.target.value)

    }

    const ClockTik =()=> {
        setClockNow(moment().format('HH:mm:ss'))
      }

    useEffect(()=>{
        GetData()
        GetKey()
        setInterval(ClockTik, 2000)
        setInterval(GetData, 4000)
        console.log(ActiveKey)
        //ttt ()
    }, [])

    useEffect(()=>{
        if(PIN == "1234"){
            setAuth(true)
        }
    }, [PIN])
    

    return (
        
        (<div className="OrderPage" > 
            <div className='container-fluid py-2'style={{height: "auto", background: "#3f7db5", color: "white"}} >
                <div className="row">
                    <div className="col-8 pt-2">
                        <h1>Order <h3>วันที่ {timeStamp} {ClockNow}</h3> </h1>
                        
                    </div>

                    {Auth==false?
                        (<>
                            <div className="col-2 pt-1">
                                <div className="card shadow mx-3" onClick={()=>window.location.reload()} style={{height: "90%", width: "80%", cursor: "pointer", color: "black"}}>
                                    <div className= 'card-body'>
                                        <h3>รีเฟรชข้อมูล</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 pt-1">
                                <div className="card shadow mx-3" onClick={()=>setAuth(false)} style={{height: "90%", width: "50%", cursor: "pointer", color: "black"}}>
                                    <div className= 'card-body'>
                                        <h3>ล็อค</h3>
                                    </div>
                                </div>
                            </div>
                        </>)
                        :null
                    }
                    
                    
                </div>
            </div>

            {Auth==!false?
            (<div className='container-fluid mt-2 text-center' style={{height: "85vh"}}>
                <img src={LockPic} style={{ marginTop: "1%" }}/><br/>

              
                    
                        {/*<label for="exampleInputPassword1">Password</label>*/}
                        <p>ใส่รหัส PIN</p>
                        <input 
                            type="password" 
                            autoFocus
                            onChange={(e)=>EnterPIN(e)} 
                            maxlength="4"
                            placeholder="****" 
                            style={{width: "10%", height: "10%", border: "5px solid gray", borderRadius: "10%", fontSize:"90px"}}/>
            </div>)
            :(<div className='container-fluid mt-2' style={{height: "85vh"}}>
                <div className="row">
                    <div className='col-5'>
                        <h1 className="mt-2 mb-4">รายการอาหารที่รอทำ</h1>
                        <Accordion defaultActiveKey={0} >
                        {Data.map((item, index)=>{
                            //console.log(item.Timestamp)
                            return(
                                item.statusCook === "NotDone"?
                                (   <div>
                                    <Card>
                                        <Card.Header >
                                            <Accordion.Toggle className="container-fluid " as={Button} variant="text" eventKey={index+1}>
                                                <div className="row">
                                                    <div className="col-4" >
                                                        <h4>โต๊ะที่: {item.TableNumber}</h4> 
                                                    </div>
                                                    <div className="col text-right">
                                                        <h4>{item.EatStatus=="Store"? "ทานที่ร้าน":"สั่งกลับบ้าน"}</h4> 
                                                    </div>
                                                    
                                                </div>
                                                
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={index+1}>
                                            <Card.Body>
                                                <strong>เวลาที่สั่ง: </strong> {item.Timestamp} <br/>
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
                                                        {item.ข้าวกะเพราหมูสับ != "0"?(<h3>ข้าวกะเพราหมูสับ: {item.ข้าวกะเพราหมูสับ}<br/></h3>):null}
                                                        {item.ข้าวผัดพริกแกงหมู != "0"?(<h3>ข้าวผัดพริกแกงหมู: {item.ข้าวผัดพริกแกงหมู}<br/></h3>):null}
                                                        {item.ข้าวผัดพริกแกงหมูกรอบ != "0"?(<h3>ข้าวผัดพริกแกงหมูกรอบ: {item.ข้าวผัดพริกแกงหมูกรอบ}<br/></h3>):null}
                                                        {item.ข้าวหมูผัดผงกะหรี่ != "0"?(<h3>ข้าวหมูผัดผงกะหรี่: {item.ข้าวหมูผัดผงกะหรี่}<br/></h3>):null}
                                                        {item.ข้าวต้มหมู != "0"?(<h3>ข้าวต้มหมู: {item.ข้าวต้มหมู}<br/></h3>):null}
                                                        {item. ข้าวไข่เจียวหมูสับ != "0"?(<h3> ข้าวไข่เจียวหมูสับ: {item. ข้าวไข่เจียวหมูสับ}<br/></h3>):null}
                                                    </div>
                                                    <hr/>
                                                
                                                <div className="row">
                                                    <div className="col-8 ">
                                                        <strong>ราคา: <h1 className="ml-3">{item.totalPrice} .-</h1></strong> 
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <button className="btn btn-primary btn-lg" onClick={()=>confirmOrder(item)}>ตรวจสอบ</button>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    </div>
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
                    <h1 className="my-2">รายการอาหารที่ทำเสร็จเเล้ว</h1>
                        <Accordion>
                            <h2 className="my-4">ช่วงเช้า<hr/></h2>
                            {Data.map((item, index)=>{
                                    //console.log(item)
                                    return(
                                        item.statusCook === "Done"?item.Timestamp.slice(16,18)<12?
                                        (   
                                            <Card>
                                                <Card.Header >
                                                    <Accordion.Toggle className="container-fluid " as={Button} variant="text" eventKey={index+1}>
                                                        <div className="row">
                                                            <div className="col-4" >
                                                                <h4>โต๊ะที่: {item.TableNumber}</h4> 
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
                                                                {item.ข้าวกะเพราหมูสับ != "0"?(<h3>ข้าวกะเพราหมูสับ: {item.ข้าวกะเพราหมูสับ}<br/></h3>):null}
                                                                {item.ข้าวผัดพริกแกงหมู != "0"?(<h3>ข้าวผัดพริกแกงหมู: {item.ข้าวผัดพริกแกงหมู}<br/></h3>):null}
                                                                {item.ข้าวผัดพริกแกงหมูกรอบ != "0"?(<h3>ข้าวผัดพริกแกงหมูกรอบ: {item.ข้าวผัดพริกแกงหมูกรอบ}<br/></h3>):null}
                                                                {item.ข้าวหมูผัดผงกะหรี่ != "0"?(<h3>ข้าวหมูผัดผงกะหรี่: {item.ข้าวหมูผัดผงกะหรี่}<br/></h3>):null}
                                                                {item.ข้าวต้มหมู != "0"?(<h3>ข้าวต้มหมู: {item.ข้าวต้มหมู}<br/></h3>):null}
                                                                {item. ข้าวไข่เจียวหมูสับ != "0"?(<h3> ข้าวไข่เจียวหมูสับ: {item. ข้าวไข่เจียวหมูสับ}<br/></h3>):null}
                                                            </div>
                                                            <hr/>
                                                        
                                                        <div className="row">
                                                            <div className="col-8 ">
                                                                <strong>ราคา: <h1 className="ml-3">{item.totalPrice} .-</h1></strong> 
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        )
                                        :null
                                    :null
                                    )})}

                            <h2 className="my-4">ช่วงหลังเที่ยง<hr/></h2>
                            {Data.map((item, index)=>{
                                    //console.log(item)
                                    return(
                                        item.statusCook === "Done"?item.Timestamp.slice(16,18)>12?
                                        (   
                                            <Card>
                                                <Card.Header >
                                                    <Accordion.Toggle className="container-fluid " as={Button} variant="text" eventKey={index+1}>
                                                        <div className="row">
                                                            <div className="col-4" >
                                                                <h4>โต๊ะที่: {item.TableNumber}</h4> 
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
                                                                {item.ข้าวกะเพราหมูสับ != "0"?(<h3>ข้าวกะเพราหมูสับ: {item.ข้าวกะเพราหมูสับ}<br/></h3>):null}
                                                                {item.ข้าวผัดพริกแกงหมู != "0"?(<h3>ข้าวผัดพริกแกงหมู: {item.ข้าวผัดพริกแกงหมู}<br/></h3>):null}
                                                                {item.ข้าวผัดพริกแกงหมูกรอบ != "0"?(<h3>ข้าวผัดพริกแกงหมูกรอบ: {item.ข้าวผัดพริกแกงหมูกรอบ}<br/></h3>):null}
                                                                {item.ข้าวหมูผัดผงกะหรี่ != "0"?(<h3>ข้าวหมูผัดผงกะหรี่: {item.ข้าวหมูผัดผงกะหรี่}<br/></h3>):null}
                                                                {item.ข้าวต้มหมู != "0"?(<h3>ข้าวต้มหมู: {item.ข้าวต้มหมู}<br/></h3>):null}
                                                                {item. ข้าวไข่เจียวหมูสับ != "0"?(<h3> ข้าวไข่เจียวหมูสับ: {item. ข้าวไข่เจียวหมูสับ}<br/></h3>):null}
                                                            </div>
                                                            <hr/>
                                                        
                                                        <div className="row">
                                                            <div className="col-8 ">
                                                                <strong>ราคา: <h1 className="ml-3">{item.totalPrice} .-</h1></strong> 
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        )
                                        :null
                                    :null
                                    )
                                })}
                    </Accordion>
                    </div>
                </div>
            </div>)}
        </div>)
    )
}

export default OrderPage
