import React, { useEffect, useState } from 'react'
import { PartnerInfo } from './PartnerInfo'
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, Tab, TextField, useMediaQuery } from '@mui/material'
import { fetchRegistro, fetchWorkshopRegistro } from '../services/registrosHelpers';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { initValuesRegister } from './initValues/initValuesFormJornada';
import useFormRegister from '../hooks/useFormRegister';
import SendIcon from '@mui/icons-material/Send';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Groups2Icon from '@mui/icons-material/Groups2';
import HandymanIcon from '@mui/icons-material/Handyman';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BuildIcon from '@mui/icons-material/Build';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';

export const Register = () => {

    const matches = useMediaQuery('(max-width:900px)');
    const matches2 = useMediaQuery('(max-width:900px)');
    const { values, handleInputChange, reset } = useFormRegister(initValuesRegister);
    const [disabled, setDisabled] = useState(true)
    const [tab, setTab] = useState('2');
    const [subtab, setSubtab] = useState('1')


    const fetchQRInvitado = async (email) => {
        let em = email.trim();

        tab === '1' ? await fetchRegistro(em) : await fetchWorkshopRegistro(em, subtab);
    }

    const fetchManualInvitado = async () => {
        let em = values.emaildata.trim().toUpperCase();

        tab === '1' ? await fetchRegistro(em) : await fetchWorkshopRegistro(em, subtab);
        reset();
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleSubtabChange = (event, newValue) => {
        setSubtab(newValue);
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
                        <TabList
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#bd4f2b"
                                }
                            }}
                            onChange={handleChange}
                            variant='scrollable'
                            aria-label="lab API tabs example"
                            sx={{ maxHeight: 55, borderRadius: 3, boxShadow: 4, ml: 'auto', mr: 'auto', maxWidth: matches ? '80%' : '40%' }}
                        >
                            <Tab icon={<Groups2Icon color="action" />} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: tab === '1' ? 'black' : 'gray' }}>Congreso</span>} value="1" />
                            <Tab icon={<HandymanIcon color="action" />} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: tab === '2' ? 'black' : 'gray' }}>Talleres</span>} value="2" />
                        </TabList>
                        {tab === '2'
                            &&
                            <>
                                <TabContext value={subtab}>
                                    <Box className='animate__animated animate__fadeInDown' sx={{ borderRadius: 3, boxShadow: 4, marginTop: 3, width: matches ? '80%' : '86%', marginLeft: 'auto', marginRight: 'auto' }}>
                                        <TabList
                                            TabIndicatorProps={{
                                                style: {
                                                    backgroundColor: "#bd4f2b"
                                                }
                                            }}
                                            onChange={handleSubtabChange}
                                            aria-label="lab API tabs example"
                                            variant='scrollable'
                                            scrollButtons
                                            sx={{ height: '60px' }}
                                        >
                                            <Tab icon={<VolunteerActivismIcon color="action" />} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: subtab === '1' ? 'black' : 'gray', width: '95px' }}>Cuidados Paliativos</span>} value="1" />
                                            <Tab icon={<BuildIcon color="action" />} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: subtab === '2' ? 'black' : 'gray', width: '150px' }}>Restauración Interproximales</span>} value="2" />
                                            <Tab icon={<FaceRetouchingNaturalIcon color="action" />} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: subtab === '3' ? 'black' : 'gray', width: '80px' }}>Paladar Hendido</span>} value="3" />
                                            <Tab icon={<AirlineSeatFlatIcon color="action" />} iconPosition='start' sx={{ fontWeight: 'bold', paddingTop: 0 }} label={<span style={{ color: subtab === '4' ? 'black' : 'gray', width: '110px' }}>Cirugía Maxilofacial</span>} value="4" />
                                        </TabList>
                                    </Box>
                                </TabContext>
                            </>}
                        <Box sx={{ borderRadius: 3, boxShadow: 0, marginTop: 1 }}>
                            <TabPanel value="1" sx={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                                <fieldset className='rounded-3' style={{ border: '2px inset #b7402a', borderRadius: '20px' }}>
                                    <legend className='float-none w-auto px-3'>
                                        <h1 className='animate__animated animate__fadeIn' style={{ fontSize: 30 }}>
                                            <strong style={{ color: '#b7402a' }}>R</strong>egistro de <strong style={{ color: '#b7402a' }}>A</strong>sistencia
                                        </h1>
                                    </legend>
                                    <Grid item sm={12} xs={12} sx={{ mt: 0, mb: 5, pb: 0 }}>
                                        <Box sx={{ flexGrow: 1, marginTop: 3, marginBottom: 3 }}>
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
                                                    />
                                                    <Button
                                                        disabled={disabled}
                                                        endIcon={<SendIcon />}
                                                        variant='contained'
                                                        onClick={fetchManualInvitado}
                                                        sx={{ backgroundColor: "#ca7757", ":hover": { backgroundColor: '#b7402a' }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}
                                                    >
                                                        Enviar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </fieldset>
                                <Box sx={{ mt: 5 }}>
                                    <PartnerInfo />
                                </Box>
                            </TabPanel>
                            <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                                <fieldset className='rounded-3' style={{ border: '2px inset #b7402a', borderRadius: '20px' }}>
                                    <legend className='float-none w-auto px-3'>
                                        <h1 className='animate__animated animate__fadeIn' style={{ fontSize: 30 }}>
                                            <strong style={{ color: '#b7402a' }}>R</strong>egistro de <strong style={{ color: '#b7402a' }}>A</strong>sistencia
                                        </h1>
                                    </legend>
                                    <Grid item sm={12} xs={12} sx={{ mt: 2, mb: 5 }}>
                                        <Box sx={{ flexGrow: 1, marginTop: 3, marginBottom: 3 }}>
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
                                                    <Button disabled={disabled} endIcon={<SendIcon />} variant='contained' onClick={fetchManualInvitado} sx={{ backgroundColor: "#ca7757", ":hover": { backgroundColor: '#b7402a' }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}>
                                                        Enviar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </fieldset>
                                <Box sx={{ mt: 2 }}>
                                    <PartnerInfo />
                                </Box>
                            </TabPanel>
                        </Box>
                    </TabContext>
                </Box>
            </Box >
        </>
    )
}
