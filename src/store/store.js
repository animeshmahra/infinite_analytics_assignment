import { configureStore } from '@reduxjs/toolkit'
import invoiceReducer from '../store/invoiceSlice'

export default configureStore({
    reducer: {
        invoices: invoiceReducer
    },
})

