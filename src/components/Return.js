import { Button, Grid, useMediaQuery } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

export const Return = () => {

    const matches = useMediaQuery('(max-width:800px)');

  return (
    <>
        <Grid item sx={{marginLeft: matches ? '-65%' : '-78%', marginBottom: '20px'}}>
            <Link to={'/home'}>
                <Button variant="contained" startIcon={<ReplyOutlinedIcon/>} sx={{ backgroundColor: '#da9d81', ":hover": {backgroundColor: '#b9482a'}}}>
                    Regresar
                </Button>
            </Link>
        </Grid>
    </>
  )
}
