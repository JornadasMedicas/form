import React, { useEffect, useState } from 'react'
import { ModulesTableGrid } from './ModulesTableGrid'
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Tab, TextField, useMediaQuery } from '@mui/material'
import { fetchRegistro } from '../services/registrosHelpers';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { fechas } from './initValues/catalogs';
import { initValuesRegister } from './initValues/initValuesFormJornada';
import useFormRegister from '../hooks/useFormRegister';
import SendIcon from '@mui/icons-material/Send';
import { TabContext, TabList, TabPanel } from '@mui/lab';

export const Register = () => {

    const matches = useMediaQuery('(max-width:900px)');
    const { values, handleInputChange, reset } = useFormRegister(initValuesRegister);
    let [invitados, setInvitados] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const fetchQRInvitado = async (email) => {
        let em = email.trim();
        const info = await fetchRegistro(em, values.fecha);

        setInvitados([info[0]]);
    }

    const fetchManualInvitado = async () => {
        console.log(values.emaildata.trim().toUpperCase());
        let em = values.emaildata.trim().toUpperCase();
        const info = await fetchRegistro(em, values.fecha);

        setInvitados([info[0]]);
        reset();
    }

    const sendData = () => {
        let shot = values.qrdata.toUpperCase().split('|');

        if (shot.length != 1) {
            shot.length > 5
                ?
                console.log('ERROR')
                :
                fetchQRInvitado(shot[1])
        }

        reset();
    }

    useEffect(() => {
        values.fecha !== '' && setDisabled(false);
    
    }, [values.fecha])

    let separator = values.qrdata.split("|").length - 1;

    if (separator === 4) {
        sendData()
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <Box sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: '80px', marginTop: '-10px' }}>
                {/* MIHO001029IX8|ROJERU.SAN1983@GMAIL.COM|NOMBRE|APELLIDO| */}
                <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
                <Box sx={{ width: '100%', typography: 'body1'}}>
                    <TabContext value={value}>
                        <Box sx={{ borderRadius: 3, boxShadow: 3, marginBottom: 3}}>
                            <TabList textColor='secondary' onChange={handleChange} aria-label="lab API tabs example" centered>
                                <Tab label="Módulos" value="1" />
                                <Tab label="Talleres" value="2" />
                            </TabList>
                        </Box>
                        <Box sx={{ borderColor: 'divider', borderRadius: 3, boxShadow: 3}}>
                            <TabPanel value="1">Item One</TabPanel>
                            <TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </Box>
                    </TabContext>
                </Box>
                <Grid item sm={12} xs={12} sx={{ mt: 2 }}>
                    <Box sx={{ marginBottom: 2 }}>
                        <h1 className='fonts animate__animated animate__fadeInUp' style={{ fontSize: 32 }}>
                            <strong style={{ color: '#b7402a' }}>A</strong>sistencia de <strong style={{ color: '#b7402a' }}>M</strong>ódulos
                        </h1>
                    </Box>
                    <Box sx={{ marginBottom: 4, marginTop: 4}}>
                        <FormControl>
                            <Grid item width={350} sx={{ marginLeft: 'auto', marginRight: 'auto'}}>
                                <InputLabel id='date-select'>
                                    Fecha de Registro
                                </InputLabel>
                                <Select
                                    labelId='date-select'
                                    label='Fechas --------------'
                                    variant='outlined'
                                    fullWidth
                                    value={values.fecha}
                                    onChange={(e) => handleInputChange(e.target.value, 'fecha')}
                                    sx={{ height: 50}}
                                >
                                    {fechas.map((cat, index) =>
                                        <MenuItem key={index} value={cat}>{cat}</MenuItem>
                                    )}
                                </Select>
                            </Grid>
                        </FormControl>
                    </Box>
                    <Box sx={{ flexGrow: 1, marginTop: 5, marginBottom: 3 }}>
                        <Grid container rowSpacing={5} columns={matches ? 1 : 16} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                            <Grid item xs={8}>
                                <TextField
                                    disabled={disabled}
                                    label='Registro QR'
                                    autoComplete='off'
                                    name='qrdata'
                                    value={values.qrdata}
                                    onChange={(e) => handleInputChange(e.target.value, 'qrdata')}
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
                            <Grid item xs={8} sx={{ overflow: 'hidden', textAlign: 'center'}}>
                                <TextField
                                        disabled={disabled}
                                        label='Registro Manual (email)'
                                        autoComplete='off'
                                        placeholder='asistente@ejemplo.com'
                                        name='email'
                                        value={values.emaildata.toUpperCase()}
                                        onChange={(e) => handleInputChange(e.target.value, 'emaildata')}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonAddAlt1Icon/>
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
                                            width: '250px'
                                        }}
                                        variant="standard"
                                        /* autoFocus={data === '' ? true : false} */
                                        fullWidth
                                    /* error={errors.matricula?.error}
                                    helperText={errors.matricula?.error ? errors.matricula?.msg : ''}
                                    inputProps={{ maxLength: 4 }} */
                                    />
                                    <Button disabled={disabled} endIcon={<SendIcon />} variant='contained' onClick={fetchManualInvitado} sx={{ backgroundColor: "#ca7757", ":hover": { backgroundColor: '#b7402a' }, marginBottom: -4, marginLeft: 1, width: '95px', height: '30px'}}>
                                        Enviar
                                    </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Box sx={{ p: 2, mt: 2, marginBottom: '70px' }}>
                    <ModulesTableGrid value={invitados} />
                </Box>
            </Box>
        </>
    )
}
