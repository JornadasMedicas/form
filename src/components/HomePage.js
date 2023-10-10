import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material'
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
  

export const HomePage = () => {

    const matches = useMediaQuery('(max-width:900px)');

    /* const fading = 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(255,255,255,0.7) 0px), linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0) 140px)'; */

  return (
    <>
        <Box sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: '100px', marginTop: '-10px'}}>
            <hr style={{width: '95%', marginLeft: 'auto', marginRight: 'auto'}}/>
            <h1 className='fonts animate__animated animate__fadeInUp' style={{fontSize: 32}}><strong style={{color: '#b7402a'}}>M</strong>ódulos <strong style={{color: '#b7402a'}}>D</strong>isponibles</h1>

            <Box sx={{ flexGrow: 1, marginTop: 3}}>
                <Grid container rowSpacing={3} columns={matches ? 1 : 16} sx={{ flexDirection: { xs: "column", md: "row" }}}>
                    <Grid item xs={8}>
                        <Link to={'/medicine'} style={{textDecoration: 'none'}}>
                            <Card className='anima' sx={{ backgroundImage: 'url(https://www.ulatina.ac.cr/sites/default/files/inline-images/01-Blog-UL-17.png)', width: '95%', minHeight: '180px', marginLeft: 'auto', marginRight: 'auto',  backgroundSize: '100%', ":hover": {cursor: 'pointer'}, transition: 'all 0.3s ease'}}>
                                <CardContent>
                                    <Typography
                                        sx={{marginRight: 'auto', marginLeft: '20px', fontWeight: 'bold', fontSize: '18px', border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
                                        mt={{ sm: 17}}
                                    >
                                        Medicina
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={8}>
                        <Link to={'/nursing'} style={{textDecoration: 'none'}}>
                            <Card className='anima' sx={{ width: '95%', minHeight: '180px', marginLeft: 'auto', marginRight: 'auto', backgroundImage: 'url(https://www.uag.mx/contenido/IM5nQ7yN1U/carrera-de-enfermeria_ov5.jpg)', backgroundSize: '100%',":hover": {cursor: 'pointer'}, transition: 'all 0.3s ease'}}>
                                <CardContent>
                                    <Typography
                                        sx={{marginRight: 'auto', marginLeft: '20px', fontWeight: 'bold', fontSize: '18px', border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
                                        mt={{ sm: 17}}
                                    >
                                        Enfermería
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={8}>
                        <Link to={'/chemicals'} style={{textDecoration: 'none'}}>
                            <Card className='anima' sx={{backgroundImage: 'url(https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/manufacturing/ey-chemists-working-scientific-research-laboratory.jpg)', width: '95%', minHeight: '180px', marginLeft: 'auto', marginRight: 'auto', backgroundSize: '100%', ":hover": {cursor: 'pointer'}, transition: 'all 0.3s ease'}}>
                                <CardContent>
                                        <Typography
                                            sx={{marginRight: 'auto', marginLeft: '20px', fontWeight: 'bold', fontSize: '18px', border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
                                            mt={{ sm: 17}}
                                        >
                                            Químicos
                                        </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={8}>
                        <Link to={'/stomatology'} style={{textDecoration: 'none'}}>
                            <Card className='anima' sx={{backgroundImage: 'url(https://www.clinicalorenzo.com/wp-content/uploads/2019/02/estomatologia-odontologia-zaragoza.jpg)', width: '95%', minHeight: '180px', marginLeft: 'auto', marginRight: 'auto', backgroundSize: '100%', ":hover": {cursor: 'pointer'}, transition: 'all 0.3s ease'}}>
                                <CardContent>
                                    <Typography
                                        sx={{marginRight: 'auto', marginLeft: '20px', fontWeight: 'bold', fontSize: '18px', border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
                                        mt={{ sm: 17}}
                                    >
                                        Estomatología
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={16}>
                        <Link to={'/form'}>
                            <Button variant="contained" endIcon={<SendIcon />} sx={{ backgroundColor: '#da9d81', ":hover": {backgroundColor: '#b9482a'}}}>
                                Registro
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </>
  )
}
