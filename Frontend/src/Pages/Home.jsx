import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
const Home = () => {
    const [loginuser, setloginuser] = useState('')
    const [data, setdata] = useState([])
    const [errors, seterrors] = useState('')

    const DataFromItems=async()=>{
      try {
        const URL="http://localhost:8080/item"
        const jwtToken=localStorage.getItem('jwtToken')
        const Responce= await axios.get(URL,{
          headers:{
            Authorization:jwtToken
          }
        });
        
        setdata(Responce.data);
        console.log(Responce.data)
      } catch (error) {
        seterrors(error.responce?.data?.message || "Error Geting data");
        
      }


    }

    useEffect(() => {
        const user=localStorage.getItem('name')
    setloginuser(user)
    }, [])
  return (
    <>
    
    <div className='w-full h-full  flex flex-col items-center justify-center'>Welcome 
      <h1 className='text-8xl text-black'>
       {loginuser}
       </h1>
    <div >
      <button onClick={DataFromItems}> Get Data</button>
    </div>
    <div>
       
                {errors && (
                    <div className="text-red-600 text-sm mb-2">{errors}</div>
                )}
                
                  {data && data.length >0 && data.map(list=>(
                    <ul key={list.name} >
                      <li className="text-2xl font-bold mb-2 text-center "> {list.name}</li>
                      <li className="text-2xl font-bold mb-2 text-center "> Price {list.price}</li>
                      <hr/>
                    </ul>
                    
                   
                      )
                    
                    
                  )}
                
    </div>

    
    </div>
    </>
  )
}

export default Home