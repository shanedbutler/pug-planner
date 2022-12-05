import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AppNav } from './nav/AppNav';
import { AuthNav } from './nav/AuthNav';
import { ApplicationViews } from './views/ApplicationViews';
import { AuthViews } from './views/AuthViews';

function App() {

    return (
        <Router>
            {!localStorage.getItem("user")
                ?
                <>
                    <AuthNav />
                    <AuthViews />
                </>
                :
                <>
                    <AppNav />
                    <ApplicationViews />
                </>}
        </Router>
    );
}

export default App;
