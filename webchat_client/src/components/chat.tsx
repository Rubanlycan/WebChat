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
    <div className='inner-div flex flex-col'>
 
    {bulkMessage.map( (m,i )=> ( <div key={i} className={`flex flex-col  w-fit ${!m.fromSelf?'self-start':'self-end'}`}>   
        <div  className={`p-2 m-2 max-w-lg ${m.fromSelf? 'bg-primary':'bg-secondary '} rounded-lg `}>
      <p className='text-white text-lg break-words  '>{ m.message }</p> 
      <p className='text-white text-[10px] py-1'>{moment().format('hh:mm A')}</p></div> 
      </div> ))}


      </div>

  )
}

export default Chat