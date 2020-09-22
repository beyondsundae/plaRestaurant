import React, {useState, useEffect} from 'react'

const MenuPage =()=> {
    let amount = 0

    const [Menu, setMenu] = useState([
        {
            food:"ข้าวเปล่า",
            price:10,
            status:"NoAdded"
        },
        {
            food:"ข้าวกะเพราหมูสับ",
            price:45,
            status:"NoAdded"
        }
    ])

    const [Order, setOrder] = useState([
        {
            food:"ข้าวเปล่า",
            amount:1,
            price:10,
            status:"Added"
        },
        {
            food:"ข้าวกะเพราหมูสับ",
            amount:2,
            price:45,
            status:"NoAdded"
        }
    ])
    const [Orderx, setOrderx] = useState(
        {
            food:"ข้าวเปล่า",
            amount:1,
            price:10,
            status:"Added"
        },
        {
            food:"ข้าวกะเพราหมูสับ",
            amount:2,
            price:45,
            status:"Added"
        }
    )

    const [selected, setSelected] = useState([])

    const [OrderTotal, setOrdertotal] = useState(0)

    const BuddhFood =()=>{
        setMenu([
            {
                food:"ข้าวเปล่า",
                price:10
            },
            {
                food:"ข้าวกะเพราหมูสับ",
                price:45
            }
        ])

    }

    const IslamFood =()=>{
        setMenu([
            {
                food:"ข้าวเปล่า",
                price:10
            },
            {
                food:"ข้าวกะเพราไก่",
                price:45
            }
        ])

    }

    const AddOrderFirst =(item, index)=>{
        // console.log(item.food)
        let tempArr = [...Order]
        // console.log(tempArr)
        console.log("item ที่เข้ามา", item)
        setOrder([...Order, {...item, amount:1} ])}

    const AddOrderSecond =(selectedItem, index)=>{
         //console.log("ที่เลือกมา :", selectedItem, index)
         let hardCopy = [...Order]
         let origin = [ ...hardCopy]

         let AddNewRow = [...hardCopy, {...selectedItem, amount:1}]
 
         hardCopy = hardCopy.filter((cartItem)=>{
             console.log("ที่มีอยู่ใน Order :",cartItem)
             
             if(cartItem.food == selectedItem.food){
                 // item ที่เลือก == ไอเทมที่มีใน Order
                 console.log("Do if")
                 return(
                     cartItem.amount += 1
                     )
                 //ต้องคืนอาหารเดิม เเละ เพิ่มจำนวนอาหารที่เลือกไป
             }
             if(cartItem.food != selectedItem.food){
                 console.log("Do else")
                 
                 return [...hardCopy, {...selectedItem, amount:1}]
                    
                 
               // setOrder([...Order, {...selectedItem, amount:1} ])
             }
         })

             console.log('hardCopy', ...hardCopy)
            //  if(hardCopy[0] == true){
            //      console.log("Do if")
            //      if(hardCopy[0] == true){
            //         hardCopy.shift()
            //      }
            //      else{
            //         console.log([...hardCopy, {...selectedItem, amount:1}])
            //     setOrder([...hardCopy, {...selectedItem, amount:1}])
            //      }
                 
            //  }
            //  else{
            //     console.log("Do else")
            //    setOrder(origin)  
            //  }
             setOrder(origin)  
             
        
    }

    const addAmount =(selectedItem)=>{
        //console.log("ที่เลือกมา :", selectedItem, index)
        let hardCopy = [...Order]
        let origin = [ ...hardCopy]

        hardCopy = hardCopy.filter((cartItem)=>{
            console.log("ที่มีอยู่ใน Order :",cartItem)
            
            if(cartItem.food == selectedItem.food){
                // item ที่เลือก == ไอเทมที่มีใน Order
                return(
                    cartItem.amount += 1
                    )
                //ต้องคืนอาหารเดิม เเละ เพิ่มจำนวนอาหารที่เลือกไป
            }
        })
            console.log('ที่จะคืนไป Order', hardCopy)
            setOrder(origin)
    }

    const minusAmount =(selectedItem)=>{
        //console.log("ที่เลือกมา :", selectedItem, index)
        let hardCopy = [...Order]
        let origin 


        hardCopy = hardCopy.filter((cartItem)=>{
            //console.log("ที่มีอยู่ใน Order :",cartItem)
           
            if(cartItem.food == selectedItem.food){
                console.log('item ที่ select มาเพื่อลบ:', selectedItem, 
                "เทียบกับ", cartItem, "คำตอบคือ", cartItem.food == selectedItem.food)
                console.log("Do if")
                // item ที่เลือก == ไอเทมที่มีใน Order
                
                    console.log("Minus Done")
                    return(
                        cartItem.amount -= 1
                    )  
                //ต้องคืนอาหารเดิม เเละ เพิ่มจำนวนอาหารที่เลือกไป

            } 

            if(cartItem.food !== selectedItem.food) {
                console.log('item ที่ select มาเพื่อลบ:', selectedItem, 
                "เทียบกับ", cartItem, "คำตอบคือ", cartItem.food != selectedItem.food)
                console.log("Do else")

                return(
                    cartItem.food != selectedItem.food
                    // return ทุกอย่างที่ไม่ใช่ตัวที่เลือกมา
                )
            }
        })
            //console.log('ที่จะคืนไป Order', origin)
            //checkpoint?origin = [...hardCopy]:origin = hardCopy
            console.log('hardCopy', hardCopy)
            setOrder(hardCopy)
    }
    
    const removeOrder =(selectedItem)=>{
        // item ที่เข้ามาคือ item ของตัวที่กดเลือกในช่องOrder
        let hardCopy = [...Order]
        // Copy array to 'hardCopy' becoz we not goona use original array

        hardCopy = hardCopy.filter((cartItem)=>{
            // เอามา loop เพื่อดูว่าใน Order นั้นมี object อะไรบ้างและจะเอา object ที่ลูปมาทำ condition แล้วจะคืนค่าจาการ condition ไป
            // console.log('ใน Order :', cartItem)
           console.log('item ที่ select มา Condition เพื่อลบ:', selectedItem, 
           "เทียบกับ", cartItem, "คำตอบคือ", cartItem.food !== selectedItem.food)

            return(
            cartItem.food !== selectedItem.food
            )
            //จะคืนข้าวกับกะเพราที่ไม่มีข้าวเปล่า ก็คือจะเหลือเเค่กะเพราคนเดียว
            //เปรียบเทียบว่าให้ return ของที่อยู่ในตะกร้ากลับไปโดยทที่จะไม่มีตัว item ที่เข้ามา
        })
        console.log("กูจะคืน :", hardCopy)
        setOrder(hardCopy)
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

    const submitOrder =()=>{

    }
    
    const cancelOrder =()=>{
        var txt;
        if (window.confirm("ต้องการยกเลิกการรายการทั้งหมดใช่หรือไม่")) {
            setOrder([])
        } else {
            txt = "You pressed Cancel!";
        }
        
    }

    const hopper =()=>{
        for(let i=0; i<Order.length; i++){
            if(Order.[i].status == "NoAdded"){
              console.log("NoAdded", Order.[i])  
            }
            else{
                console.log("Added", Order.[i])  
            }
            
        }
    }

    const hopper2 =(item, index)=>{
        for(let i=0; i<Order.length; i++){
            if(Order.[i].status == "NoAdded" || Order.[i] == ""){
                return(
                    <button className='btn btn-success'  
                    style={{marginRight: "-100px", marginLeft: '100px'}}
                    onClick={()=>AddOrderFirst(item, index)}>
            +
            </button>
                )
                
            }
            if(Order == []){
                return(
                    <p>wow</p>
                )
                
            }
            else{
                return(
                    <button className='btn btn-primary'  
                    style={{marginRight: "-100px", marginLeft: '100px'}}
                    onClick={()=>AddOrderSecond(item, index)}>
            +
            </button>
                )

            }
        }
        
    }

    useEffect(()=>{
        console.log("Menu ที่มี", Menu)
        hopper()
        //hopper2()
        // console.log(Object.keys(Order))
        // Order.splice()

        
    }, [])

    useEffect(()=>{
        console.log("Order Total", Order)
    }, [Order])

    useEffect(()=>{
        total()
    }, [Order])

    return (
        <div className='MenuPage'>
            <div className="container-fluid" style={{height: "15vh"}}>
                <div className="row">
                    <div className="col-12">
                        <h1>Menu</h1>
                    </div>

                    <div className="col-2">
                        <button className='btn btn-info mx-2' onClick={()=>BuddhFood()}>พุทธ</button>
                        <button className='btn btn-info mx-2' onClick={()=>IslamFood()}>อิสลาม</button>
                    </div>
                    <div className="col">
                        
                    </div>
                </div>
            </div>

            <div className="container-fluid"  style={{height: "85vh"}}>
            <div className="row">
                <div className="col-8 border border-danger"  style={{height: "85vh"}}>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">อาหาร</th>
                        <th scope="col">ราคา</th>
                        </tr>
                    </thead>
                   
                    <tbody>
                    {Menu.map((item, index)=>{
                        // console.log(item)
                        return(
                        <tr key={item.food}>
                        <th>{item.food}</th>
                        <th>{item.price} 
                            
                            
                        
                            {/*<button className='btn btn-success'  
                                    style={{marginRight: "-100px", marginLeft: '100px'}}
                                    onClick={()=>AddOrderFirst(item, index)}>
                            +
                            </button>
                            <button className='btn btn-primary'  
                                    style={{marginRight: "-100px", marginLeft: '100px'}}
                                    onClick={()=>AddOrderSecond(item, index)}>
                            +
                            </button>*/}
                           {hopper2(item, index)}
                            
                        </th>
                        </tr>
                    )})}
                    </tbody>
                    </table>
                </div>

                <div className="col-4 border border-danger"  style={{height: "auto", padding: "0px"}}>
                    <div className="card mx-auto" style={{height: "100% "}}>
                        <div className="card-header">
                            ORDER: 
                        </div>

                        <div className="card-body">
                        <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">อาหาร</th>
                        <th scope="col">จำนวน</th>
                        <th scope="col">ราคา</th>
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
                        <th>{item.price * item.amount} <button className="btn-dark ml-2" onClick={()=>removeOrder(item, index)}>ล้าง</button></th>
                        </tr>
                    )})}
                    </tbody>
                    </table>
                        </div>

                        <div className="card-footer">
                            <strong>ราคารวม: {OrderTotal}</strong> <br/>
                            
                        </div>
                        <button className="btn btn-success mt-5">สั่งอาหาร</button>
                        <button className="btn btn-danger" onClick={()=>cancelOrder()}>ยกเลิก</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default MenuPage
