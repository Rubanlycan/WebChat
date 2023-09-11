import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducers } from "./Reducers/rootReducers";
import storage from "redux-persist/lib/storage";
import { persistReducer,persistStore } from 'redux-persist';
const config = {
  key:'root',
  whitelist:['userSlice'],
storage
}
const persistedReducer = persistReducer(config,combineReducers(rootReducers) )
 export const store =configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({ serializableCheck: false}),
devTools:true
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore( store)

