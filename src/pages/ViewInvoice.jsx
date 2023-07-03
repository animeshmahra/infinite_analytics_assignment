import { Box, Button, Typography } from "@mui/material";
import Table from "../components/table";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { invoices } from "../store/invoiceSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Padding } from "@mui/icons-material";

export default function ViewInvoice() {
    const pdfRef = useRef()
    const { id } = useParams();
    const [invoice, setInvoice] = useState([])
    const [list, setList] = useState([])

    const handleDownload = () => {
        const input = pdfRef.current
        html2canvas(input)
            .then((canvas) => {
                const pdf = new jsPDF();
                const imgData = canvas.toDataURL('image/png');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

                console.log(pdf)
                pdf.save(`invoice_${invoice.invoiceNumber}.pdf`);
            });
    }

    const invoiceList = useSelector(invoices)

    useEffect(() => {
        const invoiceById = invoiceList.find((val) => val.invoiceNumber == id)
        console.log(invoiceById, invoiceList)
        setInvoice(invoiceById)
        setList(invoiceById.items)
    }, [])



    const columns = [
        { field: 'itemName', headerName: 'Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 200 },
        { field: 'rate', headerName: 'Rate', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 200 },
    ];

    return (
        <>
            <Box className="d-flex ">
                <a href="mailto:email@example.com">Send Email</a>
                <Button sx={{ marginLeft: 'auto' }} onClick={handleDownload} variant="outlined"> Download</Button>
            </Box>
            {invoice.name &&
                <Box ref={pdfRef} sx={{ padding: '30px' }}>
                    <Typography variant="h4" className="text-center">INVOICE</Typography>
                    <Typography variant="h5" className="text-end mt-4">Animesh Singh</Typography>
                    <Typography className="text-end">Banglore, India</Typography>
                    <Typography variant="h6" className="text-start">{invoice.name}</Typography>
                    <Typography className="text-start">{invoice.address}</Typography>

                    <Box className='d-flex justify-content-around mt-4' sx={{ background: 'lightblue' }}>
                        <Box className='d-flex'>
                            <Typography className="fw-bold">Invoice Number:</Typography>
                            <Typography>{invoice.invoiceNumber}</Typography>
                        </Box>

                        <Box className='d-flex'>
                            <Typography className=" fw-bold ">Invoice date:</Typography>
                            <Typography>{invoice.date}</Typography>
                        </Box>
                        <Box className='d-flex'>
                            <Typography className="fw-bold">Due date:</Typography>
                            <Typography> {invoice.dueDate}</Typography>
                        </Box>
                        <Box className='d-flex'>
                            <Typography className="fw-bold">Status:</Typography>
                            <Typography className="text-capitalize"> {invoice.status}</Typography>
                        </Box>
                    </Box>

                    <Table props={{ columns, list }} />

                    <Typography className="text-start mt-4">Note:{invoice.note}</Typography>
                </Box>
            }
        </>
    )
}