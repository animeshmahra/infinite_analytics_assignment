import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

const Table = ({ props }) => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        if (id) {
            const total = props.list.reduce((acc, val) => {
                const amount = val.rate * val.quantity;
                return acc + amount;
            }, 0)
            setAmount(total)
        }
    }, [id])

    const specialStyle = {
        color: 'red',
        fontWeight: 'bold',
    };

    const normalStyle = {
        color: 'black',
        fontWeight: 'bold',
    };

    const viewNavigate = (id) => {
        navigate(`/${id}`)
    }


    return (
        <Box style={{ width: 'fit-content', maxWidth: '100%' }}>
            <div className="custom-table">
                <div className="custom-table-header" >
                    {props.columns.map((column, index) =>
                        <div key={index} style={{ width: `${column['width']}px` }}>{column.headerName}</div>
                    )}
                </div>
                {
                    props.list && props.list.length > 0 &&
                    <div>
                        {
                            props.list.map((item, index) =>
                                <div key={index} >
                                    <div className="custom-table-row">
                                        {props.columns.map((column, ind) =>
                                            <div key={ind} style={{ width: `${column['width']}px` }}>
                                                {column['field'] === 'action' && <Button onClick={() => viewNavigate(item['invoiceNumber'])} variant="contained"> View </Button>}
                                                {column['field'] === 'amount' && <div> {item['rate'] * item['quantity']}</div>}
                                                {column['field'] === 'status' && <div className="text-capitalize" style={item[column['field']] === 'late' ? specialStyle : normalStyle}> {item[column['field']]}  </div>}
                                                {column['field'] !== 'amount' && column['field'] !== 'status' && column['field'] !== 'action' && <div>  {item[column['field']] ? item[column['field']] : '-'}  </div>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
                {id &&
                    <div style={{ borderBottom: '1px solid #4d4d4d', padding: '5px', display: 'flex' }}>
                        <span><b>TOTAL:</b></span><span style={{ marginLeft: 'auto', width: '100px' }}>Rs. {amount}</span>
                    </div>
                }

            </div>
        </Box >
    )
}

export default Table;