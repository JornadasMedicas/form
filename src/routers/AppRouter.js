import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';
import { Main } from '../components/Main';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route 
                        path="/"
                        exact
                        component={ Main }
                    />

                    {/* <Route 
                        exact
                        path="/"
                        component={ JournalScreen }
                    /> */}

                    <Redirect to="/"/>


                </Switch>
            </div>
        </Router>
    )
}