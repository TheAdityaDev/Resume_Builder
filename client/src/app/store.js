import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice.feature.js'

const store = configureStore({
    reducer:{
        auth:authReducer
    }
})


export default store