import { useNavigate } from "react-router-dom"
import NotFound from '../assets/download.png'
import { Box, Button, Typography } from '@mui/material'

export default function PageNotFound() {

    const navigate = useNavigate()

    const back = () => {
        navigate("/")
    }

    return (
        <>
            <Box className="fixed-center d-flex flex-column">
                <img src={NotFound} width={'100%'} />
                <Typography variant="h3">Page not Found</Typography>
                <Button onClick={back}>back</Button>
            </Box>
        </>
    )
}