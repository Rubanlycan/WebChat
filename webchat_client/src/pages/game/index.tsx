import { getRandomNumber } from '@/services/GameJoining'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import socket from '../socket/socket'

type Props = {}

const GameRoom = (props: Props) => {
  const { userData,onlineUsers } = useSelector( ( state: any ) => state.userSlice )
  const [diceImage,setDiceImage] = useState( require('../../assets/dice/roll.png'))
  const  [diceRoll,setDiceRoll] = useState(false)
// const usersToShow = onlineUsers.filter(i=>i.db_id!==userData._id )
// console.log('userShow: ',usersToShow)
let temp  = [...onlineUsers,{username:"regis"},{username:"kamal"}]
const diceData = [{
  number:1,
  img:require('../../assets/dice/dice_1.png')
},
{
  number:2,
  img:require('../../assets/dice/dice_2.png')
},
{
  number:3,
  img:  require('../../assets/dice/dice_3.png')
},
{
  number:4,
  img: require('../../assets/dice/dice_4.png')
},
{
  number:5,
  img:  require('../../assets/dice/dice_5.png')
},
{
  number:6,
  img: require('../../assets/dice/dice_5.png')
}
]

useEffect(()=>{
socket.on('diceVal',val=>{
  console.log("diceVal",val)
})
},[])

const getDiceNumber =()=>{
  setDiceRoll(true)

  setTimeout(()=>{
    const val = getRandomNumber()
    setDiceImage(diceData.find(v=>v.number===val)?.img)
    setDiceRoll(false)
    socket.emit('diceRoll',val)
  },2000)


}

  return (
    <div className='text-2xl bg-white parent'>
 
       {temp.map((i,k)=><div key={k} className='child'> <p className='text-white p-2 text-center'>{i.username}</p>
       <Image onClick={getDiceNumber} className={`${diceRoll && 'animate-spin duration-150'}  p-4 flex items-center justify-center`} 
       alt="Picture of the sice "
       onAnimationEnd={()=>setDiceRoll(false)}
        width={150} height={150} src={diceImage}/></div>)}
    

    <div className='flex h-full items-center justify-center'>
    <Image
    src={require('../../assets/snakeladder.jpeg')}
    className='object-contain h-[700px] w-[700px]'
    alt="Picture of the author"
  />
    </div>

</div>
  )
}

export default GameRoom