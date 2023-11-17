import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { Return } from './Return'
import { CountdownComponent } from './CountdownComponent'

export const Stomatology = () => {

    const matches = useMediaQuery('(max-width:900px)');

    return (
        <>
            <Box sx={{ paddingLeft: 0, paddingRight: 0, marginBottom: matches ? '110px' : '80px', marginTop: '-10px' }}>
                <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
                <h1 className='fonts animate__animated animate__fadeInDown' style={{ fontSize: 32 }}><strong style={{ color: '#b7402a' }}>E</strong>stomatología<strong></strong></h1>
                <img style={{ marginTop: 5, marginBottom: matches ? '-10px' : '-40px'}} width={'100%'} height={'auto'} src='https://i.imgur.com/g7y4usc.png'></img>
                <Return />
                <CountdownComponent />
            </Box>
        </>
    )
}
