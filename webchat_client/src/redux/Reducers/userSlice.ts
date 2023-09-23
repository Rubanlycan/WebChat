
import api from '@/axios/axiosInstance'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const saveUserData = createAsyncThunk("actionType/saveUserData",
async (userData: any) => {

  const response = await api.post('/login',userData)

  return response.data
})
const initialState = {
userData:{},
onlineUsers:[]
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
       setOnlineUsers:(state,action)=>{
         return {...state,onlineUsers:action.payload}
       }
     

    },
    extraReducers:(builder:any)=>
    {builder
    .addCase(saveUserData.fulfilled, (state, action) => {
      // action is inferred correctly here if using TS
      return {...state,userData:action.payload.data}
    })
}
})

export const {setOnlineUsers} = userSlice.actions
export default userSlice.reducer