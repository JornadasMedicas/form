import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { TableGrid } from './TableGrid'
import { Box, Grid, InputAdornment, TextField } from '@mui/material'
import { fetchRegistro } from '../services/registrosHelpers';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

export const Register = () => {

    const [formValues, handleInputChange, reset] = useForm({
        data: ''
    })

    let [invitados, setInvitados] = useState([])

    const { data } = formValues;

    let separator = data.split("|").length - 1;

    const fetchInvitado = async (email) => {
        const info = await fetchRegistro(email);

        setInvitados([info[0]]);
    }

    const sendData = () => {
        let shot = data.toUpperCase().split('|');

        if (shot.length != 1) {
            shot.length > 5 
            ? 
            console.log('ERROR')  
            :
            fetchInvitado(shot[1])
        } 

        reset();
    }

    if (separator === 4) {
        sendData()
    }

    /* useEffect(() => {
        setTimeout(() => {
            let shot = data.toUpperCase().split('|');
            console.log(shot);

            if (shot.length != 1) {
                shot.length > 5 
                ? 
                console.log('ERROR')  
                :
                fetchInvitado(shot[1])
            } 

            reset();
        }, 500)

    }, [third]) */
    

    return (
        <>
            <Grid item sm={12} xs={12} sx={{ mt: 2 }}>
                {/* MIHO001029IX8|ROJERU.SAN1983@GMAIL.COM|Estomatología|7004| */}
                <TextField
                    label='Escanear QR'
                    autoComplete='off'
                    name='data'
                    value={data}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <QrCodeScannerIcon />
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        "& label.Mui-focused": {
                            color: "#b7402a"
                        },
                        "& .MuiInput-underline:after": {
                            borderBottomColor: "#b7402a"
                          },
                        width: '300px'
                    }}
                    variant="standard"
                    /* autoFocus={data === '' ? true : false} */
                    fullWidth
                    /* error={errors.matricula?.error}
                    helperText={errors.matricula?.error ? errors.matricula?.msg : ''}
                    inputProps={{ maxLength: 4 }} */
                />
            </Grid>

            <Box sx={{ p: 2, mt: 2, marginBottom: '70px' }}>
                <TableGrid value={invitados}/>
            </Box>
        </>
    )
}
