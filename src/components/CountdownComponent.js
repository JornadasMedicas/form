import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Countdown from 'react-countdown';
import SendIcon from '@mui/icons-material/Send';

export const CountdownComponent = () => {
    const [disabled, setDisabled] = useState(true)
    const [pointeraction, setPointeraction] = useState('none')
    const [display, setDisplay] = useState(1)

    const matches = useMediaQuery('(max-width:900px)');

    const countdownAction = () => {
        setDisabled(false);
        setPointeraction('visible');
        setDisplay(2);
    }

    const registerDay = new Date("November 03, 2023 09:00:00");

  return (
    <>
        <Box sx={{ marginTop: 4 }}>
            <Typography sx={{ fontSize: 24, fontFamily: 'heebo',  display: display}}>
                {display === 1 ? 
                <>
                    ¡<b style={{ fontSize: '28px', color: '#b7402a'}}>I</b>NICIA TU REGISTRO A PARTIR DEL 3 DE NOVIEMBRE DEL 2023! <br/> <p>FALTAN <b style={{ color: 'red' }}><Countdown date={registerDay} onComplete={countdownAction}/></b> DÍAS</p>
                </> 
                :
                <>
                    ¡<b style={{ fontSize: '28px', color: '#b7402a'}}>E</b>L REGISTRO ESTÁ DISPONIBLE!
                </>}
            </Typography>
            <Grid sx={{ marginTop: 2}}>
                <Link style={{ pointerEvents: pointeraction }} to={'/form'}>
                    <Button disabled={disabled} variant="contained" endIcon={<SendIcon />} sx={{ backgroundColor: '#da9d81', ":hover": { backgroundColor: '#b9482a' }, width: matches ? '80%' : '45%' }}>
                        Registro
                    </Button>
                </Link>
            </Grid>
        </Box>
    </>
  )
}
