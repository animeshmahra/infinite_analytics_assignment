import { Box, Button, Modal, Typography, TextField, Card, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Table from "../components/table";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux'
import { invoices, updateList } from "../store/invoiceSlice";
export default function InvoiceList() {


    const dispatch = useDispatch()
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        minHeight: '40vh',
        maxHeight: '80vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        display: 'flex',
        flexDirection: 'column'
    };

    const date_input_style = {
        width: '40%',
        padding: '5px',
        borderRadius: '3px',
        border: '1px solid',
        borderColor: '#4a4a4a',
        marginLeft: 'auto',
        color: 'grey'
    }

    const columns = [
        { field: 'invoiceNumber', headerName: 'Invoice No.', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        { field: 'dueDate', headerName: 'Due Date', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'action', headerName: 'Action', width: 200 }
    ];

    const list = useSelector(invoices)
    const [open, setOpen] = useState(false)
    const [invoiceData, setInvoiceData] = useState({
        name: '',
        status: '',
        dueDate: '',
        email: '',
        address: '',
        date: `${year}-${month}-${day}`,
        items: [{
            itemName: '',
            rate: 0,
            quantity: 0
        }],
        note: '',
        invoiceNumber: Math.floor(Math.random() * 90000) + 10000
    });

    const handleClose = () => {
        setInvoiceData({
            name: '',
            status: '',
            dueDate: '',
            email: '',
            address: '',
            date: `${year}-${month}-${day}`,
            items: [{
                itemName: '',
                rate: 0,
                quantity: 0
            }],
            note: '',
            invoiceNumber: Math.floor(Math.random() * 90000) + 10000
        })
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleCreate = () => {
        dispatch(updateList(invoiceData))
        handleClose()
    }

    const handleAddMore = () => {
        if (invoiceData.items.length < 6) {
            const newItem = {
                itemName: '',
                rate: 0,
                quantity: 0,
            };
            setInvoiceData((prevData) => ({
                ...prevData,
                items: [...prevData.items, newItem],
            }));
        }
    }

    const handleItemChange = (index, event) => {
        const { name, value } = event.target;
        const updatedItems = [...invoiceData.items];
        updatedItems[index] = {
            ...updatedItems[index],
            [name]: value,
        };
        setInvoiceData((prevData) => ({
            ...prevData,
            items: updatedItems,
        }));
    };

    const handleRemoveLast = () => {
        if (invoiceData.items.length > 1) {
            setInvoiceData((prevData) => ({
                ...prevData,
                items: prevData.items.slice(0, -1),
            }));
        }
    };


    return (
        <>
            <Box className="d-flex">
                <Button sx={{ marginLeft: 'auto' }} variant="outlined" onClick={handleOpen} >Create invoice</Button>
            </Box>
            <Table props={{ columns, list }} />
            <Modal open={open}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6"> Create New Invoice <CloseIcon style={{ float: 'right' }} onClick={handleClose} /></Typography>
                    <Box className="d-flex flex-column p-2" sx={{maxHeight: '50vh'}}>
                        <Box className="d-flex justify-content-between mt-2">
                            <TextField label="Name" size="small" variant="outlined" name="name" value={invoiceData.name} onChange={handleChange} sx={{ width: '40%' }} />
                            <input type='date' style={date_input_style} name='dueDate' value={invoiceData.due_date} onChange={handleChange} />
                        </Box>

                        <Box className="d-flex justify-content-between mt-2">
                            <TextField label="Note" size="small" variant="outlined" multiline rows={3} name="note" value={invoiceData.message} onChange={handleChange} sx={{ width: '40%' }} />
                            <FormControl size='small' sx={{ width: '40%' }}>
                                <InputLabel id="demo-simple-select-label"> Status</InputLabel>
                                <Select
                                    value={invoiceData.status}
                                    onChange={handleChange}
                                    label="Status"
                                    name="status"
                                >
                                    <MenuItem value={'paid'}>Paid</MenuItem>
                                    <MenuItem value={'outstanding'} >Outstanding</MenuItem>
                                    <MenuItem value={'late'} >Late</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className="d-flex justify-content-between mt-2">
                            <TextField label="Address" size="small" variant="outlined" multiline rows={4} name="address" value={invoiceData.address} onChange={handleChange} sx={{ width: '40%' }} />
                            <TextField label="Email" size="small" variant="outlined" name="email" value={invoiceData.email} onChange={handleChange} sx={{ width: '40%' }} />

                        </Box>

                        {<Card className="d-flex flex-column p-2 mt-2">
                            Items:
                            {invoiceData.items.map((item, index) =>
                                <Box key={index} className="d-flex justify-content-between mt-2">
                                    <TextField label="Name" size="small" variant="outlined" name="itemName" value={item.itemName} onChange={(event) => handleItemChange(index, event)} sx={{ width: '30%' }} />
                                    <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Rate" size="small" variant="outlined" name="rate" value={item.rate} onChange={(event) => handleItemChange(index, event)} sx={{ width: '30%' }} />
                                    <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Quantity" size="small" variant="outlined" name="quantity" value={item.quantity} onChange={(event) => handleItemChange(index, event)} sx={{ width: '30%' }} />
                                </Box>
                            )}

                        </Card>
                        }
                        <Box>
                            <Button variant="contained" sx={{ marginTop: '5px', width: '30px' }} onClick={handleAddMore}>+</Button>
                            <Button variant="contained" sx={{ marginTop: '5px', width: '30px', marginLeft: '20px' }} onClick={handleRemoveLast}>-</Button>
                        </Box>
                    </Box>



                    <Button variant="contained" sx={{ marginTop: 'auto', marginLeft: 'auto' }} onClick={handleCreate}>Create</Button>
                </Box>
            </Modal>
        </>
    )
}