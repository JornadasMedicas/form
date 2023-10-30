import { Box, Button, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { ToBeDefined } from './ToBeDefined'
import { Return } from './Return'
import { Link } from 'react-router-dom'
import SendIcon from '@mui/icons-material/Send';
import { CountdownComponent } from './CountdownComponent'

export const Medicine = () => {

    const matches = useMediaQuery('(max-width:900px)');

    return (
        <>
            <Box sx={{ paddingLeft: 0, paddingRight: 0, marginBottom: matches ? '110px' : '80px', marginTop: '-10px' }}>
                <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
                <h1 className='fonts animate__animated animate__fadeInDown' style={{ fontSize: 32 }}><strong style={{ color: '#b7402a' }}>M</strong>edicina<strong></strong></h1>
                <img style={{ marginTop: 5, marginBottom: matches ? '0px' : '-10px'}} width={'100%'} height={'auto'} src='https://i.imgur.com/fnBwLzN.png'></img>
                <Return />
                <CountdownComponent />
            </Box>
        </>
    )
}
