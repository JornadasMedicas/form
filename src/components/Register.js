import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { TableGrid } from './TableGrid'
import { Box, Grid, InputAdornment, TextField } from '@mui/material'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

export const Register = () => {

    const [formValues, handleInputChange, reset] = useForm({
        data: ''
    })

    let [invitados, setInvitados] = useState([])

    const { data } = formValues;

    useEffect(() => {
        setTimeout(() => {
            let shot = data.toUpperCase().split(',')
            if (shot.length != 1) {
                shot.length > 5 
                ? 
                console.log('ERROR')     
                : 
                setInvitados([...invitados, shot])
            } 

            reset();
        }, 500)

    }, [data])

    return (
        <>
            <Grid item sm={12} xs={12} sx={{ mt: 2 }}>
                {/* MIHO001029IX8,rojeru.san1983@gmail.com,Estomatología,2281914008,7004 */}
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
                    autoFocus={data === '' ? true : false}
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
