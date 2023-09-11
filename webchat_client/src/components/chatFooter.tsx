import React from 'react'

type ChatFooterProps = {
  message: string;
  sendMessage: () => void;
  setMessage: ( e: string ) => void;
}


const ChatFooter = ( { message, sendMessage, setMessage }: ChatFooterProps ) => {
  return (
    <div className='flex p-4 justify-evenly bg-white'>
      <input className='w-10/12 h-[60px] border-2 rounded-lg border-secondary text-xl px-2 text-black'
        value={ message }
        onKeyDown={ e => e.key === "Enter" && sendMessage() }
        onChange={ e => setMessage( e.target.value ) } />
      <button className={ `w-1/12 ${!message ? 'bg-disabled' : 'bg-primary '} rounded-xl text-white ` } disabled={ !message } onClick={ sendMessage } >Send</button>
    </div>
  )
}

export default ChatFooter