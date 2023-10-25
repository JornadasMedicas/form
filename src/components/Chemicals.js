import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { ToBeDefined } from './ToBeDefined'
import { Return } from './Return'
import { Link } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';

export const Chemicals = () => {
    return (
        <>
            <Box sx={{ paddingLeft: 0, paddingRight: 0, marginBottom: '80px', marginTop: '-10px' }}>
                <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
                <h1 className='fonts animate__animated animate__fadeInDown' style={{ fontSize: 32 }}><strong style={{ color: '#b7402a' }}>Q</strong>uímicos<strong></strong></h1>
                <img style={{ marginTop: 5, marginBottom: 10}} width={'100%'} height={'auto'} src='https://i.imgur.com/QmREOpB.png'></img>
                <Return></Return>
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
