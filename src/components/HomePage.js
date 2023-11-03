import { Box, Button, Card, CardMedia, Grid, Typography, Zoom } from '@mui/material'
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import { CountdownComponent } from './CountdownComponent';


export const HomePage = () => {

    const matches = useMediaQuery('(max-width:900px)');

    const onDownload = () => {
        const link = document.createElement("a");
        link.download = `JORNADAS.pdf`;
        link.href = "https://www.dropbox.com/scl/fi/z1dj3wqiwfs5h4rowii80/JORNADAS.pdf?rlkey=adorlxp5txggdhl9gsn1o9imx&dl=1";
        link.click();
    };

    return (
        <>
            <Box sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: matches ? '120px' : '100px', marginTop: '-10px' }}>
                <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
                <Typography sx={{ textAlign: 'justify', fontSize: 17, fontFamily: 'heebo', fontWeight: 400, paddingLeft: 2, paddingRight: 2 }}>
                    <b style={{ fontSize: '50px', color: '#b7402a'}}>E</b>l Centro de Alta Especialidad Dr. Rafael Lucio se llena de gusto y de entusiasmo en volver a organizar nuestro máximo evento académico anual que se ha llevado a cabo desde hace 25 años.
                    La pandemia nos obligó, por seguimiento obvio de las instrucciones y recomendaciones sanitarias a tener que realizar una pausa, pero hoy nos encontramos de vuelta. <br /><br />
                    Este año, gracias al gran apoyo y atención en favorecer este tipo de eventos, la Secretaría de Salud de Veracruz así como la Dirección General de los Servicios de Salud de Veracruz, hoy a cargo de la estimada Doctora Guadalupe Díaz del Castillo Flores, ha puesto un enorme apoyo para retomar esta importante acción de acercar el conocimiento y la experiencia de los ponentes al servicio de la comunidad clínica de la región, por lo que nos llenamos de gusto de además de convocarle a participar, anunciar que este año por primera vez, no tendrá costo alguno directo para los participantes. <br /><br />
                    Hemos organizado que los días 23, 24 y 25 de Noviembre próximo tengamos pláticas divididas en 4 áreas de conocimiento, Medicina, Química, Enfermería y Estomatología. En cada rama habremos de recibir a grandes ponentes con temas que en la actualidad merecen ser tratados.  Así mismo, habremos de celebrar 4 Talleres en las instalaciones de nuestro hospital con las temáticas mencionadas anteriormente.
                    No nos resta mas que invitarle a ver los programas proyectados y a registrarse lo más pronto posible.<br /><br />
                    Nos vemos a finales de Noviembre. <br /><br />
                </Typography>
                <Typography sx={{ textAlign: 'center', fontSize: 17, fontFamily: 'heebo', fontWeight: 400 }}>
                    Atentamente <br /><br />
                    <b>Dr. Rafael Norberto Hernández Gómez</b><br />
                    Dirección del Hospital
                </Typography>
                <Box sx={{ flexGrow: 1, marginTop: 5, marginBottom: 3 }}>
                    <Grid container rowSpacing={3} columns={matches ? 1 : 16} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                        <Grid item xs={8}>
                            <img width={'70%'} height={'auto'} src='https://i.imgur.com/riAa3QB.png'></img>
                        </Grid>
                        <Grid item xs={8} sx={{ overflow: 'hidden' }}>
                            <img width={'80%'} height={'auto'} src='https://i.imgur.com/TyVnXqH.png?1'></img>
                        </Grid>
                    </Grid>
                </Box>
                <hr style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} />
                <Box sx={{ marginTop: 3 }}>
                    <h1 className='fonts animate__animated animate__fadeInUp' style={{ fontSize: 32 }}><strong style={{ color: '#b7402a' }}>M</strong>ódulos</h1>
                </Box>
                <Box sx={{ flexGrow: 1, marginTop: 3, marginBottom: 3 }}>
                    <Grid container rowSpacing={3} columns={matches ? 1 : 16} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                        <Grid item xs={8}>
                            <Link to={'/medicine'} style={{ textDecoration: 'none' }}>
                                <Card className='anima' sx={{ backgroundImage: 'url(https://www.ulatina.ac.cr/sites/default/files/inline-images/01-Blog-UL-17.png)', width: '95%', minHeight: '180px', marginLeft: 'auto', marginRight: 'auto', backgroundSize: '100%', ":hover": { cursor: 'pointer' }, transition: 'all 0.3s ease' }}>
                                    <CardContent>
                                        <Typography
                                            sx={{ marginRight: 'auto', marginLeft: '20px', fontWeight: 'bold', fontSize: '18px', border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                                            mt={{ sm: 17 }}
                                        >
                                            Medicina
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={8}>
                            <Link to={'/nursing'} style={{ textDecoration: 'none' }}>
                                <Card className='anima' sx={{ width: '95%', minHeight: '180px', marginLeft: 'auto', marginRight: 'auto', backgroundImage: 'url(https://escueladeenfermeriangelopolis.edu.mx/blog/wp-content/uploads/2020/08/carrera-de-enfermeria.jpg)', backgroundSize: '100%', ":hover": { cursor: 'pointer' }, transition: 'all 0.3s ease' }}>
                                    <CardContent>
                                        <Typography
                                            sx={{ marginRight: 'auto', marginLeft: '20px', fontWeight: 'bold', fontSize: '18px', border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                                            mt={{ sm: 17 }}
                                        >
                                            Enfermería
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={8}>
                            <Link to={'/chemicals'} style={{ textDecoration: 'none' }}>
                                <Card className='anima' sx={{ backgroundImage: 'url(https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/manufacturing/ey-chemists-working-scientific-research-laboratory.jpg)', width: '95%', minHeight: '180px', marginLeft: 'auto', marginRight: 'auto', backgroundSize: '100%', ":hover": { cursor: 'pointer' }, transition: 'all 0.3s ease' }}>
                                    <CardContent>
                                        <Typography
                                            sx={{ marginRight: 'auto', marginLeft: '20px', fontWeight: 'bold', fontSize: '18px', border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                                            mt={{ sm: 17 }}
                                        >
                                            Químicos
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={8}>
                            <Link to={'/stomatology'} style={{ textDecoration: 'none' }}>
                                <Card className='anima' sx={{ backgroundImage: 'url(https://www.clinicalorenzo.com/wp-content/uploads/2019/02/estomatologia-odontologia-zaragoza.jpg)', width: '95%', minHeight: '180px', marginLeft: 'auto', marginRight: 'auto', backgroundSize: '100%', ":hover": { cursor: 'pointer' }, transition: 'all 0.3s ease' }}>
                                    <CardContent>
                                        <Typography
                                            sx={{ marginRight: 'auto', marginLeft: '20px', fontWeight: 'bold', fontSize: '18px', border: '1px solid white', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                                            mt={{ sm: 17 }}
                                        >
                                            Estomatología
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                {/* divider */}
                <h1 className='fonts animate__animated animate__fadeInUp' style={{ fontSize: 32 }}><strong style={{ color: '#b7402a' }}>T</strong>alleres</h1>
                <Box sx={{ flexGrow: 1, marginTop: 3, marginBottom: 3 }}>
                    <Grid container rowSpacing={3} columns={matches ? 1 : 16} sx={{ flexDirection: { xs: "column", md: "row" } }}>
                        <Grid className='anima' item xs={8} sx={{ transition: 'all 0.3s ease', ":hover": { cursor: 'pointer' }}}>
                            <img width={'95%'} height={'auto'} src='https://i.imgur.com/XYWN29u.png'></img>
                        </Grid>
                        <Grid className='anima' item xs={8} sx={{ transition: 'all 0.3s ease', ":hover": { cursor: 'pointer' } }}>
                            <img width={'95%'} height={'auto'} src='https://i.imgur.com/w9b87Bp.png'></img>
                        </Grid>
                    </Grid>
                    <CountdownComponent />
                    <Grid container rowSpacing={3} columns={matches ? 1 : 16} sx={{ flexDirection: { xs: "column", md: "row" }, marginTop: 1}}>
                        <Grid item xs={16}>
                            <Button onClick={onDownload} variant="contained" endIcon={<DownloadIcon />} sx={{ backgroundColor: '#da9d81', ":hover": { backgroundColor: '#b9482a' }, width: matches ? '80%' : '45%' }}>
                                Descargar Póster de Jornadas Original
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}