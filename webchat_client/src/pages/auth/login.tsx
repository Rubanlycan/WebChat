import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import api from  '../../axios/axiosInstance'
import { ToastContainer, toast } from 'react-toastify';
import { saveUserData } from '@/redux/Reducers/userSlice';
import { useDispatch } from 'react-redux';

type Props = {}

const login = (props: Props) => {
  const router = useRouter()
const dispatch=useDispatch()
const [isDisabled,setIsDisabled] = useState(false)
  const [loginData, setLoginData ] = useState( {
    mail: "",
    password: ""
  } )

  const login = (e:any)=>{
    if(e.target.id==="name")
    {
     setLoginData({...loginData,mail:e.target.value})
    }else    {
      setLoginData({...loginData,password:e.target.value})
     }
  }
  const onNavigate = async()=>{
try{
  setIsDisabled(true)
  if(loginData.mail && loginData.password)
  {
 
   const response =  await dispatch(saveUserData(loginData) as any)

   if(response!==null && response.payload.statusCode===200)
   {
    toast.success(response.payload.message,{autoClose: 1500,})
    setTimeout(()=> router.replace('/home'),2000)


   }else{
    toast.error(response.payload.message,{autoClose: 2000,})
   }
  }else{

    toast.error("please enter the name and password",{autoClose: 2000,})
  }
  setIsDisabled(false)
}catch(e:any){
console.log(e)

toast.error("connection  refused",{autoClose: 2000,})
setIsDisabled(false)
}
   
  }
  return (
    <div  className="flex h-full flex-col justify-center items-center">
    <p className="text-2xl text-primary">Login</p>
  <div className="flex flex-col shadow-lg p-16 [&>*]:my-2">
  
    <p className='text-primary'>Mail id</p>
    <input id='name' type={'text'} placeholder="Enter your name/email"  className="border-2 text-black border-primary p-2 w-[280px] rounded-lg" onChange={login}/>

    <p className='text-primary'>Password</p>
    <input id='pass' placeholder="Enter your Password" className="border-2 text-black border-primary p-2 w-[280px] rounded-lg mb-2" onChange={login}/>
    <button className="bg-primary text-white p-2 my-2" disabled={isDisabled} onClick={onNavigate}>Login</button>
     <p><Link href="/" className="text-primary underline">Register Here</Link></p>
  </div>
  <ToastContainer/>
   </div>
  )
}

export default login