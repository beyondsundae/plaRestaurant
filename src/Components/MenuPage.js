import React, {useState, useEffect} from 'react'
import axios from 'axios'

const MenuPage =()=> {

    var dateFormat = require('dateformat');
    var now = new Date();
    const timeStamp =  dateFormat(now, "ddd dd-mm-yyyy, HH:MM:ss")
    const timeNow =  dateFormat(now, "HH:MM")

    const [Menu, setMenu] = useState([])
    const [Order, setOrder] = useState([])
    const [OrderTotal, setOrdertotal] = useState(0)

    const [BuddhFood, setBuddhFood] = useState([])
    const [IslamFood, setIslamFood] = useState([])

    const [EatStatus, setEatStatus] = useState("Store")
    const [EatColor1, setEatColor1] = useState("btn btn-primary btn-block")
    const [EatColor2, setEatColor2] = useState("btn btn-primary btn-block")

    const SetInitialBuddhFood =()=>{
       // let ChangeStatus =[...Menu]
       // ChangeStatus[index] = {...ChangeStatus[index], status:"Added"}
        let BuddhMenu = []  
        for(let i = 0; i<BuddhFood.length; i++){
            BuddhMenu.push(BuddhFood[i])
        }
        setMenu(BuddhMenu)
    }

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
        
    const AddBuddhFirst =(item, index)=>{
        let ChangeStatus =[...BuddhFood]
        ChangeStatus[index] = {...ChangeStatus[index], status:"Added"}
        setBuddhFood(ChangeStatus)
        // ChangeBuddhFood()
        //console.log(BuddhFood)
        console.log("item ที่เข้ามา", item, index)
        setOrder([...Order, {...item, amount:1} ])
        //console.log("Menu ที่มี", Menu)
    }
    const AddIslamFirst =(item, index)=>{
        let ChangeStatus =[...IslamFood]
        ChangeStatus[index] = {...ChangeStatus[index], status:"Added"}
        setIslamFood(ChangeStatus)
        // ChangeIslamFood()
        //console.log(IslamFood)
        console.log("item ที่เข้ามา", item, index)
        setOrder([...Order, {...item, amount:1} ])
        //console.log("Menu ที่มี", Menu)
    }

    const addAmount =(selectedItem)=>{
        //console.log("ที่เลือกมา :", selectedItem, index)
        let hardCopy = [...Order]
        let origin = [ ...hardCopy]

        // hardCopy = hardCopy.filter((cartItem)=>{
        //     console.log("ที่มีอยู่ใน Order :",cartItem)
            
        //     if(cartItem.food == selectedItem.food){
        //         // item ที่เลือก == ไอเทมที่มีใน Order
        //         return(
        //             cartItem.amount += 1
        //             )
        //         //ต้องคืนอาหารเดิม เเละ เพิ่มจำนวนอาหารที่เลือกไป
        //     }
        // })

        for (let i = 0; i<hardCopy.length; i++){
            if(hardCopy[i].food == selectedItem.food){
                hardCopy[i].amount += 1
            }
        }
            console.log('ที่จะคืนไป Order', hardCopy)
            setOrder(origin)
    }

    const minusAmount =(selectedItem, index)=>{
        //console.log("ที่เลือกมา :", selectedItem, index)
        let hardCopy = [...Order]

        hardCopy = hardCopy.filter((cartItem)=>{
            //console.log("ที่มีอยู่ใน Order :",cartItem)
           
            if(cartItem.food == selectedItem.food){
                // item ที่เลือก == ไอเทมที่มีใน Order
                
                    console.log("Minus Done")
                    return(
                        cartItem.amount -= 1
                    )  
                //ต้องคืนอาหารเดิม เเละ เพิ่มจำนวนอาหารที่เลือกไป
            } 

            if(cartItem.food !== selectedItem.food) {
                return(
                    cartItem.food != selectedItem.food
                    
                    // return ทุกอย่างที่ไม่ใช่ตัวที่เลือกมา
                )
            }
        })

         {/*for (let i = 0; i<hardCopy.length; i++){
             console.log(hardCopy[i].food)
             console.log(selectedItem.food)
            if(hardCopy[i].food == selectedItem.food){
                  (hardCopy[i].amount -= 1)
             }

             else if((hardCopy[i].food < selectedItem.food)){
                 console.log("wow")
                return  hardCopy.push(hardCopy[i].food  !== selectedItem.food)
         }}*/}
            //console.log('ที่จะคืนไป Order', origin)
            console.log('hardCopy', hardCopy)
            goBackBuddhStatus(selectedItem, index)
            goBackIslamStatus(selectedItem, index)
            setOrder(hardCopy)
    }
    
    const removeOrder =(selectedItem, index)=>{
        // item ที่เข้ามาคือ item ของตัวที่กดเลือกในช่องOrder
        let hardCopy = [...Order]
        // Copy array to 'hardCopy' becoz we not goona use original array
        hardCopy = hardCopy.filter((cartItem)=>{
            // เอามา loop เพื่อดูว่าใน Order นั้นมี object อะไรบ้างและจะเอา object ที่ลูปมาทำ condition แล้วจะคืนค่าจาการ condition ไป
            // console.log('ใน Order :', cartItem)
            return(
            cartItem.food !== selectedItem.food
            )
            //จะคืนข้าวกับกะเพราที่ไม่มีข้าวเปล่า ก็คือจะเหลือเเค่กะเพราคนเดียว
            //เปรียบเทียบว่าให้ return ของที่อยู่ในตะกร้ากลับไปโดยทที่จะไม่มีตัว item ที่เข้ามา
        })
        console.log("กูจะคืน :", hardCopy)
        goBackBuddhStatus(selectedItem, index)
        goBackIslamStatus(selectedItem, index)
        setOrder(hardCopy)
    }

    const goBackBuddhStatus =(item, index)=>{
        //console.log("NoAdded", index)

        const ClearALLBuddh = BuddhFood.map((list, index)=>{
            if(item.food === list.food){
                return({...list, status:"NoAdded"})
            }
            else{
                return(list)
            }
        })
        setBuddhFood(ClearALLBuddh)
    }
    const goBackIslamStatus =(item, index)=>{
        //console.log("NoAdded", index)

        const ClearALLIslam = IslamFood.map((list, index)=>{
            if(item.food === list.food){
                return({...list, status:"NoAdded"})
            }
            else{
                return(list)
            }
        })
        setIslamFood(ClearALLIslam)
    }
    const goBackALLStatus =()=>{
        //let ChangeBuddhStatus =[...BuddhFood]
        //ChangeBuddhStatus = {...ChangeBuddhStatus, status:"NoAdded"}

        const ClearALLBuddh = BuddhFood.map((list, index)=>{
                return({...list, status:"NoAdded"})
        })
        setBuddhFood(ClearALLBuddh)
        
        const ClearALLIslam = IslamFood.map((list, index)=>{
            return({...list, status:"NoAdded"})
        })
        setIslamFood(ClearALLIslam)
    }

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

    const EatatHome =()=>{
        setEatStatus("Home")
        setEatColor1("btn btn-primary btn-block")
        setEatColor2("btn btn-secondary btn-block")
    }
    const EatatStore =()=>{
        setEatStatus("Store")
        setEatColor1("btn btn-secondary btn-block")
        setEatColor2("btn btn-primary btn-block")
    }

    const confirmSubmit =(e)=>{
        var txt;
            if(Order > [] ){
                if (window.confirm(`ต้องการ"ยืนยัน"รายการทั้งหมดใช่หรือไม่`)) {
                    submitOrder()
                } else {
                    txt = "You pressed Cancel!";
                }
            }else{
                alert("กรุณาเลือกรายการอาหาร")
            }
    }
    const submitOrder =(e)=>{
        console.log(timeStamp)

        var resultx = {};
            for (var i = 0; i < Order.length; i++) {
                resultx[Order[i].food] = Order[i].amount
            }
            console.log(resultx);

        let formOrder ={
            Timestamp:timeStamp,
            totalPrice:OrderTotal,
            EatStatus:EatStatus,
            ...resultx
        }
        
        axios.post("http://localhost:4000/sendOrder", formOrder)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
            setTimeout(()=>{
                alert("สั่งอาหารสำเร็จ")
                goBackALLStatus()
                setOrder([])

            }, 1000)
        
    }
    
    const cancelOrder =()=>{
        var txt;
        if (window.confirm("ต้องการยกเลิกการรายการทั้งหมดใช่หรือไม่")) {
            setOrder([])
            goBackALLStatus()
        } else {
            txt = "You pressed Cancel!";
        }
    }

    const ViewButton =({item, index})=>{
        if(item.status == "NoAdded"){
                if(item.nation == "Buddh"){
                    return(
                        <button className='btn btn-success'  
                            // style={{marginRight: "-100px", marginLeft: '100px'}}
                            onClick={()=>{AddBuddhFirst(item, index)}}>
                        +
                        </button>
                        )  
                } else {
                    return(
                        <button className='btn btn-danger'  
                            // style={{marginRight: "-100px", marginLeft: '100px'}}
                            onClick={()=>AddIslamFirst(item, index)}>
                        +
                        </button>
                    )
                }
        } else{
            return(
            <button className='btn btn-primary'  
                // style={{marginRight: "-100px", marginLeft: '100px'}}
                onClick={()=>addAmount(item, index)}>
            +
            </button>
            )
        }
    }

   
    const readyToStore =()=>{
        var resultx = {};
            for (var i = 0; i < Order.length; i++) {
                resultx[Order[i].food] = Order[i].amount
            }
            console.log(resultx);

        var object = Order.reduce((obj, item) => 
            Object.assign(obj, { [item.food]: item.amount }), {});
            console.log(object)

        var result = Order.reduce((obj,item)=>{
            obj[item.food] = item.amount; 
            return obj }, {});
            console.log(result)

        var result2 = Order.reduce((obj,item)=>(
            {...obj,[item.food] : item.amount}), {});
            console.log(result2)

        let wow =Order.map((item)=>{
            return Object.assign({ [item.food]: item.amount }) 
        })
        let wow2 = Object.assign({}, ...wow)
            console.log(wow2)

        const obj = Object.fromEntries(Order.map(item => [item.food, item.amount]));
        console.log(obj);

        const newObject = Object.assign({}, ...Order.map(item => ({ [item.food]: item.amount })));
        console.log(newObject);

        //settempOrder(temp)
    }

    useEffect(()=>{
        //ไม่ต้องใส่ก็ได้
        let BuddhMenu = []  
        for(let i = 0; i<BuddhFood.length; i++){
            BuddhMenu.push(BuddhFood[i])
        }
        setMenu(BuddhMenu)
        
        axios.get('http://localhost:4000/IslamFood')
        .then((res)=>{
            const result = res.data
            //console.log(result)
            setIslamFood(result)
        })
        .catch((err)=>{
            alert(err)
        })
        axios.get('http://localhost:4000/BuddhFood')
        .then((res)=>{
            const result = res.data
            //console.log(result)
            setBuddhFood(result)
        })
        .catch((err)=>{
            alert(err)
        })

        EatatHome()
    }, [])

    useEffect(()=>{
        ChangeIslamFood()
    },[IslamFood])
    useEffect(()=>{
        //ให้ Render อาหารบุดดุตอนเริ่ม
        ChangeBuddhFood()
    },[BuddhFood])

    useEffect(()=>{
        console.log("Order Total", Order)
        console.log("Menu ที่มี", Menu)
        total()
    }, [Order])

    const Time =()=>{
        return <h3>{timeNow}</h3>
    }

    setInterval(() => {
        Time()
    }, 1000);

    return (
        <div className='MenuPage'>
            <div className="container-fluid" style={{height: "auto", background: "#3f7db5", color: "white"}}>
                <div className="row">
                    <div className="col-11">
                        <h1>เมนูอาหาร</h1>
                    </div>

                    <div className="col-11">
                        <button className='btn btn-info mx-2' onClick={()=>ChangeBuddhFood()}>พุทธ</button>
                        <button className='btn btn-info mx-2' onClick={()=>ChangeIslamFood()}>อิสลาม</button>
                        
                        {/*<button onClick={()=>readyToStore()}>readyToStore</button>
                        <button onClick={()=>console.log(Order)}>refresh</button>*/}
                    </div>
                    <div className="col-1 pb-2">
                        {Time()}
                    </div>
                    
                </div>
            </div>

            <div className="container-fluid"  style={{height: "85vh"}}>
            <div className="row">
                <div className="col-8"  style={{height: "85vh", padding: "0px"}}>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">อาหาร</th>
                        <th scope="col">ราคา</th>
                        <th></th>
                        </tr>
                    </thead>
                   
                    <tbody>
                    {Menu.map((item, index)=>{
                        return(
                        <tr key={item.food}>
                        <th>{item.food}</th>
                        <th>{item.price}.-</th>
                        <th> <ViewButton item={item} index={index}/></th>
                        {/*<th>{item.status} </th>*/}
                        </tr>
                    )})}
                    </tbody>
                    </table>
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
                        <th>{item.food}</th>
                        <th>
                            <button className="mx-2 btn-dark" onClick={()=>minusAmount(item, index)}>-</button>
                                {item.amount}
                            <button className="mx-2 btn-dark" onClick={()=>addAmount(item, index)}>+</button></th>
                        <th>{item.price * item.amount} </th>
                        <th><button className="btn-dark ml-2" onClick={()=>removeOrder(item, index)}>ล้าง</button></th>
                        {/*<th><button className="btn-success ml-2" onClick={()=>goBackBuddhStatus(item, index)}>x</button>
                        <button className="btn-danger ml-2" onClick={()=>goBackIslamStatus(item, index)}>x</button></th>*/}
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
                                <button className={EatColor1} onClick={()=>EatatHome()}>สั่งกลับบ้าน</button>
                            </div>
                            <div className="col-5">
                                <button className={EatColor2} onClick={()=>EatatStore()}>ทานที่ร้าน</button>
                            </div>
                        </div>
                        
                        <button className="btn btn-success btn-lg mt-3" onClick={()=>confirmSubmit()}>สั่งอาหาร</button>
                        <button className="btn btn-danger mt-3" onClick={()=>cancelOrder()}>ยกเลิก</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default MenuPage
