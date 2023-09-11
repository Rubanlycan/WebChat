import React,{useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import api from '@/axios/axiosInstance'
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
  const router = useRouter()

  const [registerData,setRegisterData]= useState({
    name:"",
    mail:"",
    password:""
  })

  const onNavigate = async() =>{
    if(registerData.name && registerData.mail && registerData.password)
    {
      const response = await api.post('/addAccountDetails',registerData)

      if(response &&  response.data.statusCode===200)
      {
        toast.success("Registered Succesfully",{autoClose: 2000,})
        router.push('/auth/login')
      }else{
        toast.error(response.data.message,{autoClose: 2000,})
      }
    }

    else
    toast.warn("Please enter all fields")
  }
  const getRegisterData = (e:any)=>{
    switch(e.target.id)
    {
      case "name":
        setRegisterData({...registerData,name:e.target.value})
        break;
        case "mail":
          setRegisterData({...registerData,mail:e.target.value})
          break;
          case "pass":
            setRegisterData({...registerData,password:e.target.value})
            break
            default:
              break
    }
  }
  return (
    <div  className="flex h-full flex-col justify-center items-center">
    <p className="text-2xl text-primary">Register</p>
  <div className="flex flex-col shadow-lg p-16 [&>*]:my-2" >
     
  <p className='text-primary'>Name</p>
    <input id='name' placeholder="Enter your name"  className="text-black  border-2 border-primary p-2 w-[280px] rounded-lg"  onChange={getRegisterData}/>
     
    <p className='text-primary'>Email</p>
    <input id='mail' placeholder="Enter your mail id" className="text-black  border-2 border-primary p-2 w-[280px] rounded-lg mb-2"  onChange={getRegisterData}/>
     
    <p className='text-primary'>Password</p>
    <input id='pass' placeholder="Enter your Password" className="text-black border-2 border-primary p-2 w-[280px] rounded-lg mb-2" onChange={getRegisterData} />
    <button className="bg-primary text-white p-2 my-2" onClick={onNavigate}>Register</button>
     <p><Link href="/auth/login" className="text-primary underline">Login Here</Link></p>
  </div>
  <ToastContainer/>
   </div>
  )
}
