import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Swal from 'sweetalert2'
import { queries } from '@testing-library/react'
import moment from 'moment';

const MenuPage =(props)=> {

    var dateFormat = require('dateformat');
    var now = new Date();
    const timeStamp =  dateFormat(now, "ddd dd-mm-yyyy, HH:MM:ss")
    const [ClockNow, setClockNow] = useState(moment().format('HH:mm:ss'));
    
    const [Page, setPage] = useState("first")

    const [Menu, setMenu] = useState([])
    const [Order, setOrder] = useState([])
    const [OrderTotal, setOrdertotal] = useState(0)

    const [DataOrder, setDataOrder] = useState([])

    const [BuddhFood, setBuddhFood] = useState([])
    const [IslamFood, setIslamFood] = useState([])
    const [Drink, setDrink] = useState([])

    const [EatStatus, setEatStatus] = useState("Store")
    const [EatColor1, setEatColor1] = useState("btn btn-primary btn-block")
    const [EatColor2, setEatColor2] = useState("btn btn-primary btn-block")

    const GetDataOrder =()=>{
        axios.get('http://localhost:4000/Data')
        .then((res)=>{
            const result = res.data
            setDataOrder(result)
        })
        .catch((err)=>{
            Swal.fire({
                title: "Error",
                icon: 'warning',
                text: err
            })
        })
    }

    const GetDataMenu =()=>{
         axios.get('http://localhost:4000/Drink')
        .then((res)=>{
            const result = res.data
            setDrink(result)
        })
        .catch((err)=>{
            Swal.fire({
                title: "Error",
                icon: 'warning',
                text: err
            })
        })

        axios.get('http://localhost:4000/IslamFood')
        .then((res)=>{
            const result = res.data
            //console.log(result)
            setIslamFood(result)
        })
        .catch((err)=>{
            Swal.fire({
                title: "Error",
                icon: 'warning',
                text: err
            })
        })

        axios.get('http://localhost:4000/BuddhFood')
        .then((res)=>{
            const result = res.data
            //console.log(result)
            setBuddhFood(result)
        })
        .catch((err)=>{
            Swal.fire({
                title: "Error",
                icon: 'warning',
                text: err
            })
        })
       
    }


    /***************************** Change Each Nation Food *****************************/
    const ChangeBuddhFood =()=>{
        let BuddhMenu = []  
        for(let i = 0; i<BuddhFood.length; i++){
            BuddhMenu.push(BuddhFood[i])
        }
        setMenu(BuddhMenu)
    }
    const ChangeIslamFood =()=>{
        let IslamMenu = []  
        for(let i = 0; i<IslamFood.length; i++){
            //console.log(IslamFood[i])
            IslamMenu.push(IslamFood[i])
        }
        setMenu(IslamMenu)
    }
    const ChangeDrink =()=>{
        const Drinkx  = Drink.map((item)=>{
            return item
        })
        setMenu(Drinkx)
    }
    
    /***************************** Add Food FirstTime *****************************/
    const AddBuddhFirst =(item, index)=>{
        let ChangeStatus =[...BuddhFood]
        ChangeStatus[index] = {...ChangeStatus[index], status:"Added"}
        setBuddhFood(ChangeStatus)
        console.log("item ที่เข้ามา", item, index)
        setOrder([...Order, {...item, amount:1} ])
        //console.log("Menu ที่มี", Menu)
    }
    const AddIslamFirst =(item, index)=>{
        let ChangeStatus =[...IslamFood]
        ChangeStatus[index] = {...ChangeStatus[index], status:"Added"}
        setIslamFood(ChangeStatus)
        console.log("item ที่เข้ามา", item, index)
        setOrder([...Order, {...item, amount:1} ])
        //console.log("Menu ที่มี", Menu)
    }
    const AddDrinkfirst =(item, index)=>{
        let ChangeStatus =[...Drink]
        ChangeStatus[index] = {...ChangeStatus[index], status:"Added"}
        setDrink(ChangeStatus)
        console.log("item ที่เข้ามา", item, index)
        setOrder([...Order, {...item, amount:1} ])
        //console.log("Menu ที่มี", Menu)
    }

    /***************************** Add Food Color Function *****************************/
    const AddFoodButton =({item, index})=>{
        // [+] button with condition to change function and color
        if(item.status == "NoAdded"){
                if(item.nation == "Buddh"){
                    return(
                        <button className='btn btn-success'  
                            // style={{marginRight: "-100px", marginLeft: '100px'}}
                            onClick={()=>{AddBuddhFirst(item, index)}}>
                        Add
                        </button>
                        )  
                } else if(item.nation == "Islam"){
                    return(
                        <button className='btn btn-danger'  
                            // style={{marginRight: "-100px", marginLeft: '100px'}}
                            onClick={()=>AddIslamFirst(item, index)}>
                        Add
                        </button>
                    )
                } else if(item.nation == "drink"){
                    return(
                        <button className='btn btn-warning'  
                            // style={{marginRight: "-100px", marginLeft: '100px'}}
                            onClick={()=>AddDrinkfirst(item, index)}>
                        Add
                        </button>
                    )
                }
        } else {
            return(
            <button className='btn btn-primary'  
                // style={{marginRight: "-100px", marginLeft: '100px'}}
                onClick={()=>addAmount(item, index)}>
            Add More...
            </button>
            )
        }
    }

    /***************************** Add Amount *****************************/
    const addAmount =(selectedItem)=>{
        //console.log("ที่เลือกมา :", selectedItem, index)
        let hardCopy = [...Order]
        let origin = [ ...hardCopy]

        // hardCopy = hardCopy.filter((cartItem)=>{
        //     console.log("ที่มีอยู่ใน Order :",cartItem)
            
        //     if(cartItem.name == selectedItem.name){
        //         // item ที่เลือก == ไอเทมที่มีใน Order
        //         return(
        //             cartItem.amount += 1
        //             )
        //         //ต้องคืนอาหารเดิม เเละ เพิ่มจำนวนอาหารที่เลือกไป
        //     }
        // })

        for (let i = 0; i<hardCopy.length; i++){
            if(hardCopy[i].name == selectedItem.name ){
                hardCopy[i].amount += 1
            }
        }
            console.log('ที่จะคืนไป Order', hardCopy)
            setOrder(origin)
    }

    /***************************** Minus Amount *****************************/
    const minusAmount =(selectedItem, index)=>{
        //console.log("ที่เลือกมา :", selectedItem, index)
        let hardCopy = [...Order]

        hardCopy = hardCopy.filter((cartItem)=>{
            //console.log("ที่มีอยู่ใน Order :",cartItem)
           
            if(cartItem.name == selectedItem.name){
                // item ที่เลือก == ไอเทมที่มีใน Order
                
                    console.log("Minus Done")
                    return(
                        cartItem.amount -= 1
                    )  
                //ต้องคืนอาหารเดิม เเละ เพิ่มจำนวนอาหารที่เลือกไป
            } 

            if(cartItem.name !== selectedItem.name) {
                return(
                    cartItem.name != selectedItem.name
                    
                    // return ทุกอย่างที่ไม่ใช่ตัวที่เลือกมา
                )
            }
        })

         {/*for (let i = 0; i<hardCopy.length; i++){
             console.log(hardCopy[i].name)
             console.log(selectedItem.name)
            if(hardCopy[i].name == selectedItem.name){
                  (hardCopy[i].amount -= 1)
             }

             else if((hardCopy[i].name < selectedItem.name)){
                 console.log("wow")
                return  hardCopy.push(hardCopy[i].name  !== selectedItem.name)
         }}*/}
            //console.log('ที่จะคืนไป Order', origin)
            //console.log('hardCopy', hardCopy)
            goBackGate(selectedItem, index)
            setOrder(hardCopy)
    }
    
    /***************************** Clear All Order *****************************/
    const removeOrder =(selectedItem, index)=>{
        // item ที่เข้ามาคือ item ของตัวที่กดเลือกในช่องOrder
        let hardCopy = [...Order]
        // Copy array to 'hardCopy' becoz we not goona use original array
        hardCopy = hardCopy.filter((cartItem)=>{
            // เอามา loop เพื่อดูว่าใน Order นั้นมี object อะไรบ้างและจะเอา object ที่ลูปมาทำ condition แล้วจะคืนค่าจาการ condition ไป
            // console.log('ใน Order :', cartItem)
            return(
            cartItem.name !== selectedItem.name
            )
            //จะคืนข้าวกับกะเพราที่ไม่มีข้าวเปล่า ก็คือจะเหลือเเค่กะเพราคนเดียว
            //เปรียบเทียบว่าให้ return ของที่อยู่ในตะกร้ากลับไปโดยทที่จะไม่มีตัว item ที่เข้ามา
        })
        //console.log("กูจะคืน :", hardCopy)
        goBackGate(selectedItem, index)
        setOrder(hardCopy)
    }

    const goBackGate =(item, index)=>{
        //คืนค่า NoAdded ให้เเต่ละชนิด ไม่เหมารวม
        const backDrink = Drink.some((list)=>{ return list.name == item.name })
            if(backDrink == true) {
                goBackDrinkStatus(item, index)}
        const backBuddh = BuddhFood.some((list)=>{ return list.name == item.name })
            if(backBuddh == true) goBackBuddhStatus(item, index)
        const backIslam = IslamFood.some((list)=>{ return list.name == item.name })
            if(backIslam == true) goBackIslamStatus(item, index)
    }

    /***************************** Change Buddh Food Status to NoAdded BY that item *****************************/
    const goBackBuddhStatus =(item, index)=>{
        //console.log("NoAdded", index)
        const ClearALLBuddh = BuddhFood.map((list, index)=>{
            if(item.name === list.name){
                return({...list, status:"NoAdded"})
            }else{
                return(list)
            }
        })
        setBuddhFood(ClearALLBuddh)
    }
    /***************************** Change Islam Food Status to NoAdded BY that item *****************************/
    const goBackIslamStatus =(item, index)=>{
        //console.log("NoAdded", index)
        const ClearALLIslam = IslamFood.map((list, index)=>{
            if(item.name === list.name){
                return({...list, status:"NoAdded"})
            }else{
                return(list)
            }
        })
        setIslamFood(ClearALLIslam)
    }
    /***************************** Change Drink Status to NoAdded BY that item *****************************/
    const goBackDrinkStatus =(item, index)=>{
        //console.log("NoAdded", index)
        const ClearALLDrink = Drink.map((list, index)=>{
            if(item.name === list.name){
                return({...list, status:"NoAdded"})
            }else{
                return(list)
            }
        })
           setDrink(ClearALLDrink)
    }
    /***************************** Change All Food Status to NoAdded *****************************/
    const goBackALLStatus =()=>{
        const ClearALLIslam = IslamFood.map((list, index)=>{
            return({...list, status:"NoAdded"})
        })
        setIslamFood(ClearALLIslam)  
        const ClearALLBuddh = BuddhFood.map((list, index)=>{
                return({...list, status:"NoAdded"})
        })
        setBuddhFood(ClearALLBuddh)
        const ClearALLDrink = Drink.map((list, index)=>{
            return({...list, status:"NoAdded"})
        })
        setDrink(ClearALLBuddh)
    }

    /***************************** Sum total price *****************************/
    const total =()=>{
        let totalVal = 0
        // Order.map((item)=>{
        //    return totalVal+=item.price
        // })
        // console.log(totalVal)
        for (let i = 0; i<Order.length; i++){
            totalVal += Order[i].price * Order[i].amount
        }
        console.log("Price:", totalVal)
        setOrdertotal(totalVal)
    }

    /***************************** Toggle Status for setState *****************************/
    const EatatStore =()=>{
        setEatStatus("Store")
        setEatColor1("btn btn-secondary btn-block")
        setEatColor2("btn btn-primary btn-block")
    }
    const EatatHome =()=>{
        setEatStatus("Home")
        setEatColor1("btn btn-primary btn-block")
        setEatColor2("btn btn-secondary btn-block")
    }
    
    /***************************** Confirm Order *****************************/
    const confirmSubmit =()=>{
        var txt;
            if(Order > [] ){
                // if (window.confirm(`ต้องการ"ยืนยัน"รายการทั้งหมดใช่หรือไม่`)) {
                //     submitOrder()
                // } else {
                //     txt = "You pressed Cancel!";
                // }
                Swal.fire({
                    title: "ต้องการ'ยืนยัน'รายการทั้งหมดใช่หรือไม่",
                    icon:"question",
                    showConfirmButton: true,
                    confirmButtonColor:"#008a43",
                    confirmButtonText: "ยืนยัน",

                    showCancelButton:true,
                    cancelButtonColor: "",
                    cancelButtonText: "กลับไปทำต่อ",
                    reverseButtons: true
                    
                })
                .then((result)=>{
                    if(result.isConfirmed){
                        Swal.fire({
                            title: "ส่งรายการอาหารเรียบร้อย",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        .then(()=>submitOrder())
                    }
                    else {
                        
                    }
                })
                
            }else{
                Swal.fire({
                    title: "กรุณาเลือกรายการอาหารก่อน", 
                    icon: "warning", 
                    showConfirmButton: false, 
                    timer: 1500});
            }
    }
    /***************************** Submit Order *****************************/
    const submitOrder =()=>{
        // console.log(timeStamp)

        var OrderNow = {};
            for (var i = 0; i < Order.length; i++) {
                OrderNow[Order[i].name] = Order[i].amount
                //Combine whole order to one object
            }
            console.log(OrderNow);

        let formOrder ={
            Timestamp:timeStamp,
            TableNumber:props.TableNumber,
            totalPrice:OrderTotal,
            EatStatus:EatStatus,
            ...OrderNow
        }
        
        axios.post("http://localhost:4000/sendOrder", formOrder)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
            setTimeout(()=>{
                goBackALLStatus()
                setOrder([])

                GetDataOrder()
                setPage("second")
            }, 1000)
    }

    /***************************** Cancel Order *****************************/
    const cancelOrder =()=>{
        Swal.fire({
            title: "ต้องการยกเลิกการรายการทั้งหมดใช่หรือไม่",
            icon: "question",
            confirmButtonText: "ยกเลิกทั้งหมด",
            confirmButtonColor: "#ec003a",

            cancelButtonText: "กลับไปทำต่อ",
            showCancelButton: true,
            //cancelButtonColor: "blue",
            reverseButtons: true,

        })
        .then((result)=>{
            if(result.isConfirmed){
                Swal.fire({
                    icon: "success",
                    title: "ยกเลิกทุกรายการเรียบร้อย",
                    showConfirmButton: false,
                    timer: 1500
                })
                setOrder([])
                goBackALLStatus()
            }

        })
    }
   
    const readyToStore =()=>{
        //scrap members in array to one object
        var resultx = {};
            for (var i = 0; i < Order.length; i++) {
                resultx[Order[i].name] = Order[i].amount
            }
            console.log(resultx);

        var object = Order.reduce((obj, item) => 
            Object.assign(obj, { [item.name]: item.amount }), {});
            console.log(object)

        var result = Order.reduce((obj,item)=>{
            obj[item.name] = item.amount; 
            return obj }, {});
            console.log(result)

        var result2 = Order.reduce((obj,item)=>(
            {...obj,[item.name] : item.amount}), {});
            console.log(result2)

        let wow =Order.map((item)=>{
            return Object.assign({ [item.name]: item.amount }) 
        })
        let wow2 = Object.assign({}, ...wow)
            console.log(wow2)

        const obj = Object.fromEntries(Order.map(item => [item.name, item.amount]));
        console.log(obj);

        const newObject = Object.assign({}, ...Order.map(item => ({ [item.name]: item.amount })));
        console.log(newObject);

        //settempOrder(temp)
    }

    const cancelorder =()=>{
        alert(props.TableNumber)
    }

    const ClockTik =()=> {
        setClockNow(moment().format('HH:mm:ss'))
      }

    //Get Menu มาเก็บไว้ใน Arr ของเเต่ละชนิดก่อน
    useEffect(()=>{
        EatatStore()
        GetDataOrder()
        GetDataMenu()
        setInterval(ClockTik, 2000)
        
    }, [])

    //set เมนูตอนเเรกให้เป็นอาหารบุดดุ
    
    useEffect(()=>{
        ChangeIslamFood()
    },[IslamFood])
    useEffect(()=>{
        //ให้ Render อาหารบุดดุตอนเริ่ม
        ChangeDrink()
    },[Drink])
    useEffect(()=>{
        //ให้ Render อาหารบุดดุตอนเริ่ม
        ChangeBuddhFood()
    },[BuddhFood])

    //อัพเดทราคา
    useEffect(()=>{
        console.log("Order Total", Order)
        console.log("Menu ที่มี", Menu)
        //เเสดงราคาทุหครังที่มีออเดอร์เข้ามา
        total()
    }, [Order])

    const Time =()=>{
        return <h3>{ClockNow}</h3>
    }


    return (
        <div className='MenuPage'>
         
            {Page == "first"?
            (<>
                <div className="container-fluid" style={{height: "auto", background: "#3f7db5", color: "white"}}>
                    <div className="row">
                        <div className="col-10 pt-2">
                            <h1>เมนูอาหาร โต๊ะที่ {props.TableNumber}</h1>
                        </div>

                        <div className="col-2 pt-1">
                            <div className="card shadow mx-3" onClick={()=>setPage("second")} style={{height: "90%", cursor: "pointer", color: "black"}}>
                                <div className= 'card-body'>
                                     <h3>ดูรายการที่สั่ง</h3>
                                </div>
                             
                            </div>
                        </div>

                        <div className="col-10">
                            <button className='btn btn-info mx-2' onClick={()=>ChangeBuddhFood()}>อาหาร</button>
                            <button className='btn btn-info mx-2' onClick={()=>ChangeIslamFood()}>ของทานเล่น</button>
                            <button className='btn btn-info mx-2' onClick={()=>ChangeDrink()}>เครื่องดื่ม</button>
                        </div>
                        
                        <div className="col-2 pb-2 pr-5 text-right">
                            {Time()}
                        </div>
                        
                    </div>
                </div>

                <div className="container-fluid"  style={{height: "85vh"}}>
                    <div className="row" >
                        <div className="col-8"  style={{height: "85vh"}}>
                            <div className="row" style={{height: "85vh", overflow: "auto"}}>
                            {Menu.map((item, index)=>{
                                return(
                               
                                <div className="card shadow" key={index} style={{width: "18em", maxHeight: "28em", margin: "5px"}}>
                                    <div className="text-center">
                                        <img class="card-img-top" src="https://i.pinimg.com/564x/a5/34/59/a53459aa45fb7f89982c361a88d77737.jpg" style={{maxWidth: "270px"}}/>
                                    </div>
                                     
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            {item.name}
                                        </h4>
                                        <p>ราคา: {item.price} .-</p>
                                        <div className="text-right">
                                            <AddFoodButton item={item} index={index}/>
                                        </div>
                                        
                                    </div>
                                </div>
                            )})}
                            </div>
                        </div>

                        <div className="col-4"  style={{height: "auto"}}>
                            <div className="card mx-auto" style={{height: "100% "}}>
                                <div className="card-header">
                                    รายการที่สั่ง: 
                                </div>

                                <div className="card-body" style={{ padding: "5px"}}>
                                <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                <th scope="col">อาหาร</th>
                                <th scope="col">จำนวน</th>
                                <th scope="col">ราคา</th>
                                <th></th>
                                {/*<th></th>*/}
                                </tr>
                            </thead>
                        
                            <tbody>
                            {Order.map((item, index)=>{
                                return(
                                <tr key={index}>
                                <th>{item.name}</th>
                                <th>
                                    <button className="mx-2 btn-dark" onClick={()=>minusAmount(item, index)}>-</button>
                                        {item.amount}
                                    <button className="mx-2 btn-dark" onClick={()=>addAmount(item, index)}>+</button></th>
                                <th>{item.price * item.amount} </th>
                                <th><button className="btn-dark ml-2" onClick={()=>removeOrder(item, index)}>ล้าง</button></th>
                                </tr>
                            )})}
                            </tbody>
                            </table>
                                </div>

                                <div className="card-footer text-right"style={{padding: "1px"}}>
                                    <div className='row' >
                                        <div className="col-9">
                                            <strong>ราคารวม: </strong>
                                        </div>
                                        <div className="col mr-5">
                                            <h3>{OrderTotal} .-</h3>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="row mt-2">
                                    <div className="offset-1 col-5">
                                        <button className={EatColor2} onClick={()=>EatatStore()}>ทานที่ร้าน</button>
                                    </div>
                                    <div className="col-5">
                                        <button className={EatColor1} onClick={()=>EatatHome()}>สั่งกลับบ้าน</button>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-3" style={{paddingRight : 0 }}>
                                        <button className="btn btn-danger btn-lg mt-3 " style={{width: "100%"}} onClick={()=>cancelOrder()}>ยกเลิก</button>
                                    </div>
                                    <div className="col-9">
                                        <button className="btn btn-success btn-lg  mt-3" style={{width: "100%"}} onClick={()=>confirmSubmit()}>สั่งอาหาร</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>)
            :(<>
                <div className="container-fluid" style={{height: "auto", background: "#3f7db5", color: "white"}}>
                    <div className="row">
                        <div className="col-10 pt-2">
                            <h1>รายการอาหารที่สั่ง</h1>
                        </div>

                        <div className="col-2 pt-1">
                            <div className="card shadow mx-2" onClick={()=>setPage("first")} style={{height: "90%", cursor: "pointer", color: "black"}}>
                                <div className= 'card-body'>
                                     <h3>กลับไปหน้าเมนู</h3>
                                </div>
                             
                            </div>
                        </div>
                        
                        <div className="col-11 pb-2">
                            
                        </div>
                        <div className="col-1">
                            {Time()}
                        </div>
                        
                    </div>
                </div>

                <div className="container-fluid"  style={{height: "85vh", background: 'rgb(236, 240, 222)'}}>
                    <div className="row mt-2">
                        <div className="col">
                            <img src="https://cdn.dribbble.com/users/572419/screenshots/4646056/drr.gif"/>
                        </div>
                        <div className="col">
                            <div className="card shadow mx-2"  style={{cursor: "pointer", color: "black", maxHeight: '75vh', overflow: "scroll"}}>
                                <div className= 'card-body'>
                                    {DataOrder.map((item, idex)=>{
                                        return(
                                            item.statusCook === "NotDone"?
                                                item.TableNumber == props.TableNumber?
                                            (<div>
                                                <Card>
                                                    <Card.Header >
                                                            <div className="row">
                                                                <div className="col-4" >
                                                                    <h4>โต๊ะที่: {item.TableNumber}</h4> 
                                                                </div>
                                                                <div className="col text-right">
                                                                    <h4>{item.EatStatus=="Store"? "กินที่ร้าน":"สั่งกลับบ้าน"}</h4> 
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                    </Card.Header>
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
                                                                    {/*<button className="btn btn-primary btn-lg" onClick={()=>cancelorder(item)}>ตรวจสอบ</button>*/}
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                </Card>
                                            </div>):null
                                            :null
                                        )

                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
            }
        </div>
    )
}

export default MenuPage
