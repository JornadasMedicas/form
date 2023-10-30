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
import { WorkshopsTableGrid } from './WorkshopsTableGrid';
import Groups2Icon from '@mui/icons-material/Groups2';
import HandymanIcon from '@mui/icons-material/Handyman';

export const Register = () => {

    const matches = useMediaQuery('(max-width:900px)');
    const { values, handleInputChange, reset } = useFormRegister(initValuesRegister);
    let [assistModules, setAssistModules] = useState([]);
    let [assistWorkshops, setAssistWorkshops] = useState([]);
    const [disabled, setDisabled] = useState(true)
    const [tab, setTab] = useState('1');

    console.log(assistModules);

    const fetchQRInvitado = async (email) => {
        let em = email.trim();
        const info = await fetchRegistro(em);

        setAssistModules([...assistModules, info[0]]);
    }

    const fetchManualInvitado = async () => {
        let em = values.emaildata.trim().toUpperCase();
        const info = await fetchRegistro(em);

        setAssistModules([...assistModules, info[0]]);
        reset();
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

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
      values.emaildata !== '' ? setDisabled(false) : setDisabled(true)
    }, [values.emaildata])

    useEffect(() => {
        let separator = values.qrdata.split("|").length - 1;

        if (separator === 4) {
            sendData();
        }
    
    }, [values.qrdata])

    return (
        <>
            <Box sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: matches ? '100px' : '80px', marginTop: '-10px' }}>
                {/* MIHO001029IX8|ROJERU.SAN1983@GMAIL.COM|OMAR SAHIB|MIRÓN HERNÁNDEZ| */}
                <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tab}>
                        <Box sx={{ borderRadius: 3, boxShadow: 4, marginBottom: 0, width: matches ? '80%' : '40%', marginLeft: 'auto', marginRight: 'auto'}}>
                            <TabList 
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#bd4f2b"
                                }
                            }}
                            onChange={handleChange} 
                            aria-label="lab API tabs example" 
                            centered
                            sx={{ height: '60px' }}
                            >
                                <Tab icon={<Groups2Icon color="action" />} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: tab === '1' ? 'black' : 'gray'}}>Congreso</span>} value="1" />
                                <Tab icon={<HandymanIcon color="action"/>} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: tab === '2' ? 'black' : 'gray' }}>Talleres</span>} value="2" />
                            </TabList>
                        </Box>
                        <Box sx={{ borderRadius: 3, boxShadow: 0 }}>
                            <TabPanel value="1" sx={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                                <Grid item sm={12} xs={12} sx={{ mt: 2, mb: 5}}>
                                    <Box sx={{ marginBottom: 2 }}>
                                        <h1 className='fonts animate__animated animate__fadeInUp' style={{ fontSize: 32 }}>
                                            <strong style={{ color: '#b7402a' }}>A</strong>sistencia de <strong style={{ color: '#b7402a' }}>M</strong>ódulos
                                        </h1>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, marginTop: 5, marginBottom: 3 }}>
                                        <Grid container rowSpacing={5} columns={matches ? 1 : 16} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                                            <Grid item xs={8}>
                                                <TextField
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
                                                    fullWidth
                                                /* error={errors.matricula?.error}
                                                helperText={errors.matricula?.error ? errors.matricula?.msg : ''}
                                                inputProps={{ maxLength: 4 }} */
                                                />
                                            </Grid>
                                            <Grid item xs={8} sx={{ overflow: 'hidden', textAlign: 'center' }}>
                                                <TextField
                                                    label='Registro Manual (email)'
                                                    autoComplete='off'
                                                    placeholder='asistente@ejemplo.com'
                                                    name='email'
                                                    value={values.emaildata.toUpperCase()}
                                                    onChange={(e) => handleInputChange(e.target.value, 'emaildata')}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PersonAddAlt1Icon />
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
                                                    fullWidth
                                                /* error={errors.matricula?.error}
                                                helperText={errors.matricula?.error ? errors.matricula?.msg : ''}
                                                inputProps={{ maxLength: 4 }} */
                                                />
                                                <Button disabled={disabled} endIcon={<SendIcon />} variant='contained' onClick={fetchManualInvitado} sx={{ backgroundColor: "#ca7757", ":hover": { backgroundColor: '#b7402a' }, marginBottom: -4, marginLeft: 1, width: '95px', height: '30px' }}>
                                                    Enviar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>

                                <Box sx={{ mt: 4 }}>
                                    <ModulesTableGrid value={assistModules} />
                                </Box>
                            </TabPanel>
                            <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                                <Grid item sm={12} xs={12} sx={{ mt: 2, mb: 5 }}>
                                    <Box sx={{ marginBottom: 2 }}>
                                        <h1 className='fonts animate__animated animate__fadeInUp' style={{ fontSize: 32 }}>
                                            <strong style={{ color: '#b7402a' }}>A</strong>sistencia de <strong style={{ color: '#b7402a' }}>T</strong>alleres
                                        </h1>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, marginTop: 5, marginBottom: 3 }}>
                                        <Grid container rowSpacing={5} columns={matches ? 1 : 16} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                                            <Grid item xs={8}>
                                                <TextField
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
                                                    fullWidth
                                                /* error={errors.matricula?.error}
                                                helperText={errors.matricula?.error ? errors.matricula?.msg : ''}
                                                inputProps={{ maxLength: 4 }} */
                                                />
                                            </Grid>
                                            <Grid item xs={8} sx={{ overflow: 'hidden', textAlign: 'center' }}>
                                                <TextField
                                                    label='Registro Manual (email)'
                                                    autoComplete='off'
                                                    placeholder='asistente@ejemplo.com'
                                                    name='email'
                                                    value={values.emaildata.toUpperCase()}
                                                    onChange={(e) => handleInputChange(e.target.value, 'emaildata')}
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <PersonAddAlt1Icon />
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
                                                    fullWidth
                                                /* error={errors.matricula?.error}
                                                helperText={errors.matricula?.error ? errors.matricula?.msg : ''}
                                                inputProps={{ maxLength: 4 }} */
                                                />
                                                <Button disabled={disabled} endIcon={<SendIcon />} variant='contained' onClick={fetchManualInvitado} sx={{ backgroundColor: "#ca7757", ":hover": { backgroundColor: '#b7402a' }, marginBottom: -4, marginLeft: 1, width: '95px', height: '30px' }}>
                                                    Enviar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>

                                <Box sx={{ mt: 4 }}>
                                    <WorkshopsTableGrid value={assistWorkshops} />
                                </Box>
                            </TabPanel>
                        </Box>
                    </TabContext>
                </Box>
            </Box>
        </>
    )
}
