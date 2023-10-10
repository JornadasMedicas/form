import { Box } from '@mui/material'
import React from 'react'
import { ToBeDefined } from './ToBeDefined'
import { Return } from './Return'

export const Chemicals = () => {
  return (
    <>
        <Box sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: '80px', marginTop: '-10px'}}>
            <hr style={{width: '95%', marginLeft: 'auto', marginRight: 'auto'}}/>
            <h1 className='fonts animate__animated animate__fadeInDown' style={{fontSize: 32}}><strong style={{color: '#b7402a'}}>Q</strong>uímicos<strong></strong></h1>
            <ToBeDefined></ToBeDefined>
            <Return></Return>
        </Box>
    </>
  )
}
