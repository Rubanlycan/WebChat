import React from 'react'
import moment from 'moment'
type messageProps = {
  message:string,
  fromSelf:boolean
}
type ChatProps = {
    bulkMessage:messageProps[]
   
}

const Chat:React.FC<ChatProps> = ({bulkMessage,}) => {

  return (
    <div className='h-full overflow-y-visible flex flex-col bg-white justify-end'>
    {bulkMessage.map( (m,i )=> ( <div className={`w-fit flex flex-col ${!m.fromSelf?'self-start':'self-end'} w-min-[10px]`}>   
        <div key={i} className={`p-2 m-2 min-w-10 ${m.fromSelf? 'bg-primary':'bg-secondary '} rounded-lg`}>
      <p className='text-white text-lg'>{ m.message }</p> 
      <p className='text-white text-[10px]'>{moment().format('hh:mm A')}</p></div> 
      </div> ))}
      </div>

  )
}

export default Chat