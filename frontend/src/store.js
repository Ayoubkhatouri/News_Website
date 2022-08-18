import {configureStore} from '@reduxjs/toolkit'
import newsReducer from './features/news/newsSlice'
import userReducer from './features/user/userSlice'

export const store=configureStore({
    reducer:{
        news:newsReducer,
        user:userReducer,
    }
})