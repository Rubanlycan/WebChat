import React, { useState } from 'react'

interface SelectedNameInterface {
    username: string,
    db_id: string,
    userID: string
}

type ChatHeaderProps = { 
    selectedName: SelectedNameInterface,
    userData: any,
    onLogout: () => void,
    onCreateGameClick: () => void,
    createBtnPressed:boolean
}

const ChatHeader = ( { selectedName, userData, onLogout ,onCreateGameClick,createBtnPressed}: ChatHeaderProps ) => {

    return (
        <div className='flex justify-between items-center px-3 h-20 bg-primary'>

            <p className='text-white  px-4'>{ selectedName?.username ? selectedName?.username : "No online users found" }</p>
            <div>
            <button onClick={onCreateGameClick} className={`${createBtnPressed?'bg-error':'bg-success'} rounded-xl text-white py-3 px-5 hover:scale-105`}>{`${createBtnPressed?'Cancel': 'Create Game'}`}</button>
           {createBtnPressed && <p className='text-white'>{"Searching..."}</p>}
            </div>
 
            <div className='flex'>
                <div className='flex flex-col'>
                    <p className='text-white  px-4'>{ userData?.name }</p>
                    <p className='text-success text-sm  px-4'>{ userData?.isLoggedIn ? "online" : "offline" }</p>
                </div>
                <p className='text-white p-2 cursor-pointer' onClick={ onLogout }>Logout</p>
            </div>
        </div>
    )
}

export default ChatHeader