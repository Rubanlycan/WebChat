import React from 'react'

interface SelectedNameInterface {
    username: string,
    db_id: string,
    userID: string
}

type ChatHeaderProps = {
    selectedName: SelectedNameInterface,
    userData: any,
    onLogout: () => void
}

const ChatHeader = ( { selectedName, userData, onLogout }: ChatHeaderProps ) => {
    return (
        <div className='flex justify-between items-center px-3 h-20 bg-primary'>

            <p className='text-white  px-4'>{ selectedName?.username ? selectedName?.username : "No online users found" }</p>
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