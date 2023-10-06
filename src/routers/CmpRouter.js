import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
/* import { GenerateQR } from '../components/GenerateQR' */
import { Register } from '../components/Register';
import { Form } from '../components/Form';

export const CmpRouter = () => {
  return (
    <main>
        <div className='container-fluid text-center'>
            <div className='row'>
                <div className='col-sm-12 pt-3 card animate__animated animate__fadeIn'>
                    <h1 className='fonts'><strong style={{color: '#b7402a'}}>J</strong>ornadas <strong style={{color: '#b7402a'}}>M</strong>édicas 2023</h1>
                    <div className='jornadas' style={{padding: 0, margin: 0}}>
                        <img src='https://i.imgur.com/i6wM5sO.png' title="source: imgur.com" alt="Jornadas" width="100%" height="300px"/>
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

                            <Route
                                exact
                                path="/form"
                                component={ Form }
                            />

                            <Redirect to="/form"/>
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
