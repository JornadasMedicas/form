import { Box, Button, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { ToBeDefined } from './ToBeDefined'
import { Return } from './Return'
import { Link } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';

export const Stomatology = () => {

    const matches = useMediaQuery('(max-width:900px)');

    return (
        <>
            <Box sx={{ paddingLeft: 0, paddingRight: 0, marginBottom: '80px', marginTop: '-10px' }}>
                <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
                <h1 className='fonts animate__animated animate__fadeInDown' style={{ fontSize: 32 }}><strong style={{ color: '#b7402a' }}>E</strong>stomatología<strong></strong></h1>
                <img style={{ marginTop: 5, marginBottom: matches ? '-10px' : '-40px'}} width={'100%'} height={'auto'} src='https://i.imgur.com/gJq0SfN.png'></img>
                <Return />
                <Grid item xs={16}>
                    <Link to={'/form'}>
                        <Button variant="contained" endIcon={<SendIcon />} sx={{ backgroundColor: '#da9d81', ":hover": { backgroundColor: '#b9482a' } }}>
                            Registro
                        </Button>
                    </Link>
                </Grid>
            </Box>
        </>
    )
}
