import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { ToBeDefined } from './ToBeDefined'
import { Return } from './Return'
import { Link } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';

export const Stomaworkshop2 = () => {
  return (
    <>
        <Box sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: '80px', marginTop: '-10px' }}>
            <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
            <h1 className='fonts animate__animated animate__fadeInDown' style={{ fontSize: 32 }}><strong style={{ color: '#b7402a' }}>U</strong>tilización de <strong style={{ color: '#b7402a' }}>D</strong>istintas <strong style={{ color: '#b7402a' }}>T</strong>écnicas <strong style={{ color: '#b7402a' }}>Q</strong>uirúrgicas en <strong style={{ color: '#b7402a' }}>P</strong>acientes de <strong style={{ color: '#b7402a' }}>L</strong>abio y <strong style={{ color: '#b7402a' }}>P</strong>aladar <strong style={{ color: '#b7402a' }}>H</strong>endido</h1>
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
