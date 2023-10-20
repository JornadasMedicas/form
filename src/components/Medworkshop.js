import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { ToBeDefined } from './ToBeDefined'
import { Link } from 'react-router-dom'
import { Return } from './Return'
import SendIcon from '@mui/icons-material/Send';

export const Medworkshop = () => {
  return (
    <>
        <Box sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: '80px', marginTop: '-10px' }}>
            <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
            <h1 className='fonts animate__animated animate__fadeInDown' style={{ fontSize: 32 }}><strong style={{ color: '#b7402a' }}>E</strong>structura de <strong style={{ color: '#b7402a' }}>I</strong>ntervención en los <strong style={{ color: '#b7402a' }}>C</strong>uidados <strong style={{ color: '#b7402a' }}>P</strong>aliativos: un <strong style={{ color: '#b7402a' }}>E</strong>nfoque <strong style={{ color: '#b7402a' }}>M</strong>ultidisciplinario e <strong style={{ color: '#b7402a' }}>I</strong>ntersectorial</h1>
            <ToBeDefined></ToBeDefined>
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
