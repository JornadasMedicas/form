import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom';
import { CmpRouter } from './CmpRouter';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        path="/"
                        component={ CmpRouter }
                    />

                    <Redirect to="/home"/>
                </Switch>
            </div>
        </Router>
    )
}