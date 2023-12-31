"use clinet"

import api from '@/axios/axiosInstance'
import Chat from '@/components/chat';
import ChatFooter from '@/components/chatFooter';
import ChatHeader from '@/components/ChatHeader';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import socket from '../socket/socket';
import Modal from '@/components/modal';

type Props = {}
type messageProps = {
  message: string,
  fromSelf: boolean
}

type inncommingmessageProps = {
  message: string,
  from: string
}
const Home = ( props: Props ) => {

  const Router = useRouter()
  const [ usersList, setUserList ] = React.useState( [] )
  const [ createBtnPressed, setCreateBtnPressed ] = useState( false )
  const { userData } = useSelector( ( state: any ) => state.userSlice )
  const [ message, setMessage ] = React.useState( '' )
  const [ isConnected, setIsConnected ] = React.useState( socket.connected )
  const [ modalOpen, setModalOpen ] = React.useState( false)

  const [ bulkMessage, setBulkMessage ] = useState<( messageProps[] )>( [] )
  const [ userOnlineList, setUserOnlineList ] = useState( [] )
  const [ selectedName, setSelectedName ] = useState( { username: "", db_id: "", userID: "" } )

  const onCreateGameClick = () => {
    setCreateBtnPressed( !createBtnPressed )
  }

  useEffect(()=>{
     let time = setTimeout(()=>{setCreateBtnPressed(false),setModalOpen(false)},15*1000)
          
     return()=>clearTimeout(time)
  },[createBtnPressed])
  useEffect(()=>{
        if(createBtnPressed)
    socket.emit('game', {roomName:'gameRoom',roomId:userData._id,createdBy:userData.username});
  },[createBtnPressed])

  const socketIsConnected = () => {
    setIsConnected( true )
  }
  const socketIsNotConnected = () => {
    setIsConnected( false )
  }
  const messageReceiver = ( { message, from }: inncommingmessageProps ) => {
    setBulkMessage( prev => [ ...prev, {
      message,
      fromSelf: false,
    } ] );

  }
const handleModalClose = ()=>{
  setModalOpen(!modalOpen)
}
  useEffect( () => {
    socket.auth = { username: userData?.name, db_id: userData?._id };
    socket.connect();


    socket.on( "connect", () => {

      socket.on("game",(room)=>{
    console.log('created room: ',userData._id!==room.roomId)
        if(userData._id!==room.roomId)
        {
      handleModalClose()
        socket.emit("joining Game",room)
      
    }
      })
     
      socket.on("users joined",d=>console.log("users joined: ",d))
      socket.on('event',(d)=>console.log('room chat: ',d))
      userOnlineList.forEach( ( user ) => {

        if ( user?.self ) {
          user.connected = true;
        }
      } );
    } )
    socket.on( "disconnect", () => {
      userOnlineList.forEach( ( user ) => {
        if ( user.self ) {
          user.connected = false;
        }
      } );
    } );
    socket.on( "users", ( users ) => {
      console.log( 'users: ', users )
      setUserOnlineList( users )
      setSelectedName( users.filter( u => u.username !== userData.name )[ 0 ] )
    } )

    socket.on( "connect", socketIsConnected );
    socket.on( "disconnect", socketIsNotConnected );
    socket.on( "private message", messageReceiver )

    return () => {
      socket.off( "private message", messageReceiver )
      socket.off( "connect", socketIsConnected )
      socket.off( "disconnect", socketIsNotConnected )

    }

  }, [] )


  const getAllusersList = () => {
    api.get( "/usersList" ).then( ( res: any ) => {
      if ( res && res.data.statusCode === 200 ) {

        let filteredData = res.data.data.filter( user => user._id !== userData._id )

        setUserList( filteredData )

      }
    } ).catch( ( e: any ) => {
      console.log( e )
    } )
  }
  useEffect( getAllusersList, [] )

  const onLogout = async () => {
    try {

      const response = await api.post( '/logout', { mail: userData.mail, password: userData.password } )

      if ( response !== null && response.data.statusCode === 200 ) {
        toast.success( "Logged out successfully" )
        socket.disconnect()
        localStorage.removeItem( 'persist:root' );
        Router.replace( '/' )
      }
    } catch ( e ) {
      toast.error( "something went wrong" )
    }
  }
  const sendMessage = () => {

    socket.emit( "private message", {
      message,
      to: selectedName?.userID,
    } );
    setBulkMessage( prev => [ ...prev, { message, fromSelf: true } ] )

    setMessage( "" )
  }

  const selectUserNameToChat = ( u: any ) => {
    let findUser = userOnlineList.find( i => i.db_id === u._id )

    let user = { username: "", db_id: "", userID: "" }

    if ( findUser?.userID ) {
      user = { ...selectedName, username: findUser.username, db_id: findUser.db_id, userID: findUser.userID }

    } else {
      user = { ...selectedName, username: u.name, db_id: u._id, userID: "" }
    }
    setBulkMessage( [] )
    setSelectedName( user )
  }

  const checkUserLoggedIn = ( id ) => {
    let index = userOnlineList.findIndex( u => u.db_id === id )
    return index
  }
  return (
    <>

      <div className=' flex h-screen bg-white'>
        <div className=' w-3/12 border-r-2 h-full'>
          <div className='flex justify-between items-center  h-14 bg-primary' ><p className='text-white p-3'>Users List</p></div>
          <ul>
            { usersList.map( user => {
              return (
                <div onClick={ () => selectUserNameToChat( user ) } key={ user?._id } className='cursor-pointer border-b-2 flex justify-between items-center px-2'>
                  <li

                    className=' text-black px-2 py-4 '>{ user?.name }</li>
                  <p className={ `${checkUserLoggedIn( user._id ) > -1 ? "text-success " : "text-error"} text-sm` }>{ ` ${checkUserLoggedIn( user._id ) > -1 ? "online" : "offline"} ` }</p>
                </div>
              )
            } ) }
          </ul>
        </div>
        <div className='w-9/12 flex flex-col justify-end'>
          <ChatHeader onLogout={ onLogout } userData={ userData } selectedName={ selectedName } onCreateGameClick={ onCreateGameClick } createBtnPressed={ createBtnPressed } />
          <Chat bulkMessage={ bulkMessage } />
          <ChatFooter message={ message } sendMessage={ sendMessage } setMessage={ setMessage } />
          {modalOpen && <Modal><div className='h-[250px] w-[380px] flex justify-center items-center rounded-md  bg-white'>
            <div className='w-full h-full'>
              <p className='text-center my-5 text-xl text-success'>Match Joining Pool</p>
              <p className='text-center my-5'>kamal Created the Game?</p>
            <p className='text-center'>Players Joined</p>
            <p className='text-center'>2/4</p>
            <div className='flex justify-between mx-3 '>
              <button className='bg-success py-2 px-4 rounded-md text-white'>Join</button>
              <p className='text-error' onClick={handleModalClose}>Cancel</p>
            </div>
            </div>
       
           </div></Modal>}

        </div>
      </div>
      <ToastContainer />
   
    </>
  )
}

export default Home