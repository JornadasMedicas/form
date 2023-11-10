import { Button, Checkbox, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { initValueFetchAssist } from './initValues/initValuesFormJornada';
import ThreePIcon from '@mui/icons-material/ThreeP';
import SendIcon from '@mui/icons-material/Send';
import Clock from 'react-live-clock';
import 'moment/locale/es';
import { fetchAssistant } from '../services/registrosHelpers';
import useForm2 from '../hooks/useForm2';
import swal from 'sweetalert2';
import { info } from '../helpers/partnerInfo';


export const PartnerInfo = () => { //IMPORTANT!!! use destructuring to aim array directly and listen to changes made over it, NOT object
    const { values, handleInputChange, reset } = useForm2(initValueFetchAssist);
    const [disabled, setDisabled] = useState(true);
    const [assistInfo, setAssistInfo] = useState([]);

    const triggerFetch = async () => {
        const email = values.fetchassist.trim().toUpperCase();
        const partner = await fetchAssistant(email);

        if (partner) {
            const assist = info(partner);
            swal.fire(assist);
        }

        reset();
    }

    useEffect(() => {
        values.fetchassist !== '' ? setDisabled(false) : setDisabled(true)
    }, [values.fetchassist])

    useEffect(() => {
        console.log(assistInfo);
    }, [assistInfo])

    return (
        <>
            <fieldset className='rounded-3' style={{ border: '2px inset #ff9900', borderRadius: '20px' }}>
                <legend className='float-none w-auto px-3'>
                    <h1 className='animate__animated animate__fadeIn' style={{ fontSize: 30 }}>
                        <strong style={{ color: '#b7402a' }}>C</strong>onsulta de <strong style={{ color: '#b7402a' }}>I</strong>nformación
                    </h1>
                </legend>
                <Grid item xs={8} sx={{ overflow: 'hidden', textAlign: 'center', pb: 5, mt: 2 }}>
                    <TextField
                        label='Consultar Asistente (email)'
                        autoComplete='off'
                        placeholder='asistente@ejemplo.com'
                        name='fetchemail'
                        value={values.fetchassist.toUpperCase()}
                        onChange={(e) => handleInputChange(e.target.value, 'fetchassist')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ThreePIcon />
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
                    <Button disabled={disabled} endIcon={<SendIcon />} variant='contained' onClick={triggerFetch} sx={{ backgroundColor: "#ca7757", ":hover": { backgroundColor: '#b7402a' }, marginBottom: 0, marginTop: 2, marginLeft: 1, width: '95px', height: '30px' }}>
                        Enviar
                    </Button>
                </Grid>
            </fieldset>
            <Grid sx={{ overflow: 'hidden', textAlign: 'center', pb: 0, mt: 6 }}>
                <h3>
                    <Clock
                        format={'dddd LL - h:mm:ss A'}
                        interval={1000}
                        ticking={true}
                        locale='es'
                    />
                </h3>
            </Grid>
        </>
    )
}
