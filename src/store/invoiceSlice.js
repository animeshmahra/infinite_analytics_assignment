import { createSlice } from '@reduxjs/toolkit'

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    value: [{
      invoiceNumber: '123421',
      name: 'Invoice 1',
      status: 'outstanding',
      dueDate: '2023-07-10',
      email: "invoice1@gmail.com",
      address: "1234 NW Bobcat Lane, St. Robert, MO 65584-5678",
      date: '2023-06-30',
      items: [
        {
          itemName: 'Item 1',
          rate: 10,
          quantity: 2
        },
        {
          itemName: 'Item 2',
          rate: 15,
          quantity: 1
        }
      ],
      note: 'This is an example invoice.'
    },
    {
      invoiceNumber: '123211',
      name: 'Invoice 2',
      status: 'late',
      dueDate: '2023-06-30',
      email: "animesh@va2pt.com",
      address: "123 NW Bobcat Lane, St. Robert, MO 65584-5678",
      date: '2023-06-30',
      items: [
        {
          itemName: 'Item 3',
          rate: 20,
          quantity: 3
        }
      ],
      note: 'Another example invoice.'
    },
    {
      invoiceNumber: '123422',
      name: 'Invoice 1',
      status: 'paid',
      dueDate: '2023-07-10',
      email: "invoice3@gmail.com",
      address: "1234 NW Bobcat Lane, St. Robert, MO 65584-5678",
      date: '2023-06-30',
      items: [
        {
          itemName: 'Item 1',
          rate: 10,
          quantity: 2
        },
        {
          itemName: 'Item 2',
          rate: 15,
          quantity: 1
        }
      ],
      note: 'This is an example invoice.'
    },],
  },

  reducers: {
    updateList: (state, action) => {
      state.value = [...state.value, action.payload]
    },

    
  },
})

export const { updateList } = invoiceSlice.actions

export const invoices = (state) => state.invoices.value

export default invoiceSlice.reducer