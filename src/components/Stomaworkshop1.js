import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { ToBeDefined } from './ToBeDefined'
import { Link } from 'react-router-dom'
import { Return } from './Return';
import SendIcon from '@mui/icons-material/Send';

export const Stomaworkshop1 = () => {
  return (
    <>
        <Box sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: '80px', marginTop: '-10px' }}>
            <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
            <h1 className='fonts animate__animated animate__fadeInDown' style={{ fontSize: 32 }}><strong style={{ color: '#b7402a' }}>C</strong>omplicaciones y <strong style={{ color: '#b7402a' }}>E</strong>rrores en el <strong style={{ color: '#b7402a' }}>T</strong>ratamiento de <strong style={{ color: '#b7402a' }}>R</strong>estauración <strong style={{ color: '#b7402a' }}>I</strong>nterproximales</h1>
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
