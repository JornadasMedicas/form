import React from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom';
/* import { GenerateQR } from '../components/GenerateQR' */
import { Register } from '../components/Register';
import { Form } from '../components/Form';
import { HomePage } from "../components/HomePage";
import { Medicine } from '../components/Medicine';
import { Nursing } from '../components/Nursing';
import { Stomatology } from '../components/Stomatology';
import { Chemicals } from '../components/Chemicals';
import { Medworkshop } from '../components/Medworkshop';
import { Stomaworkshop1 } from '../components/Stomaworkshop1';
import { Stomaworkshop2 } from '../components/Stomaworkshop2';
import { Stomaworkshop3 } from '../components/Stomaworkshop3';

export const CmpRouter = () => {
  return (
    <main>
        <div className='container-fluid text-center'>
            <div className='row'>
                <div className='col-sm-12 pt-3 card animate__animated animate__fadeIn'>
                    <Link to={'/home'} style={{ textDecoration: 'none', color: 'black' }}>
                        <h1><strong style={{color: '#b7402a'}}>J</strong>ornadas <strong style={{color: '#b7402a'}}>M</strong>édicas 2023</h1>
                    </Link>
                    <div className='jornadas' style={{padding: 0, margin: 0}}>
                        <Link to={'/home'}>
                            <img src='https://i.imgur.com/9fULOzU.png' title="source: imgur.com" alt="Jornadas" width="100%" height="auto"/>
                        </Link>
                    </div>
                    <div className='mt-3'>
                        <Switch>
                            {/* <Route 
                                path="/generate"
                                exact
                                component={ GenerateQR }
                            /> */}

                            {/* <Route 
                                exact
                                path="/register"
                                component={ Register }
                            /> */}

                            {/* <Route
                                exact
                                path="/form"
                                component={ Form }
                            /> */}

                            <Route
                                exact
                                path="/home"
                                component={ HomePage }
                            />

                            <Route
                                exact
                                path="/medicine"
                                component={ Medicine }
                            />

                            <Route
                                exact
                                path="/nursing"
                                component={ Nursing }
                            />

                            <Route
                                exact
                                path="/stomatology"
                                component={ Stomatology }
                            />

                            <Route
                                exact
                                path="/chemicals"
                                component={ Chemicals }
                            />

                            {/* <Route
                                exact
                                path="/medworkshop"
                                component={ Medworkshop }
                            />

                            <Route
                                exact
                                path="/restorationworkshop"
                                component={ Stomaworkshop1 }
                            />

                            <Route
                                exact
                                path="/techniquesworkshop"
                                component={ Stomaworkshop2 }
                            />

                            <Route
                                exact
                                path="/surgeryworkshop"
                                component={ Stomaworkshop3 }
                            /> */}

                            <Redirect to="/home"/>
                        </Switch>
                    </div>
                    <div className='footer'>
                        <img style={{marginRight: '10px'}} src="https://tramites.veracruz.gob.mx/assets/img/logo.png" alt="Gob" width="250px" height="100%"/>
                        <img style={{marginRight: '10px'}} src="https://i.imgur.com/KBthrFn.png" alt="CAE" width="auto" height="40px"/>
                        <img src="https://i.imgur.com/tf4Yg4k.png" alt="sesver" width="150px" height="auto"/>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}
