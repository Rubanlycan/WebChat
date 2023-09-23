import React from 'react'

type ChatFooterProps = {
  message: string;
  sendMessage: () => void;
  setMessage: ( e: string ) => void;
  onlineUserList: Array<any>
}


const ChatFooter = ( { message, sendMessage, setMessage,onlineUserList  }: ChatFooterProps ) => {
  console.log('get online users list: _',onlineUserList)
if(onlineUserList.length===1)
return <div >
  <p className='text-black last:text-center p-5'>No users found online</p>
</div>
  return (
    <div className='flex p-4 justify-evenly bg-white'>
      <input className='w-10/12 h-[60px] border-2 rounded-lg border-secondary text-xl pl-3 text-black'
        value={ message }
        onKeyDown={ e => e.key === "Enter" && sendMessage() }
        onChange={ e => setMessage( e.target.value ) } />
      <button className={ `w-1/12 ${!message ? 'bg-disabled' : 'bg-primary '} rounded-xl text-white ` } disabled={ !message} onClick={ sendMessage } >Send</button>
    </div>
  )
}

export default ChatFooter