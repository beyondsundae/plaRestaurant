import React, {useState, useEffect} from 'react'

const MenuPage =()=> {

    const [Food, setFood] = useState([
        {
            food:"ข้าวเปล่า",
            price:10
        },
        {
            food:"ข้าวกะเพราหมูสับ",
            price:45
        }
    ])

    const [Order, setOrder] = useState([])


    const BuddhFood =()=>{
        setFood([
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
        setFood([
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

    
    const AddOrder =(item)=>{
        console.log(item)
        
        setOrder([...Order, item])


    }

    useEffect(()=>{
        console.table("Menu", Food)
    }, [])

    useEffect(()=>{
        console.log("Order", Order)
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
                    {Food.map((item, index)=>{
                        return(
                        <tr key={index}>
                        <th>{item.food}</th>
                        <th>{item.price} 
                            <button className='btn btn-primary'  
                                    style={{marginRight: "-100px", marginLeft: '100px'}}
                                    onClick={()=>AddOrder(item)}>
                            +
                            </button>
                        </th>
                        </tr>
                    )})}
                    </tbody>
                    </table>
                </div>

                <div className="col-4 border border-danger"  style={{height: "auto", padding: "0px"}}>
                    <div className="card mx-auto" style={{height: "90%"}}>
                        <div className="card-header">
                            ORDER: 
                        </div>

                        <div className="card-body">
                        <table class="table">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">อาหาร</th>
                        <th scope="col">ราคา</th>
                        </tr>
                    </thead>
                   
                    <tbody>
                    {Order.map((item, index)=>{
                        return(
                        <tr key={index}>
                        <th>{item.food}</th>
                        <th>{item.price}</th>
                        </tr>
                    )})}
                    </tbody>
                    </table>
                        </div>

                        <div className="card-footer">
                            <strong>ราคารวม: </strong> <br/>
                            
                        </div>
                        <button className="btn btn-success mt-5">สั่งอาหาร</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default MenuPage
