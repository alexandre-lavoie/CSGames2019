import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Creator from './components/Creator';
import Hubs from './components/Hubs';
import Problems from './components/Problems';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import { Urls } from './urls';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import Question from './components/Question';
import Home from './components/Home';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_FIREBASE_CONFIG: string
        }
    }
}

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: red[500]
        },
        secondary: {
            main: red[500]
        }
    }
})

const App: React.FC = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
                <CssBaseline />
                <Router>
                    <Header />
                    <Route path={Urls.HOME} exact component={Home} />
                    <Route path={Urls.PROBLEM} exact component={Problems} />
                    <Route path={Urls.LOGIN} component={Login} />
                    <Route path={Urls.CREATOR} exact component={Creator} />
                    <Route path={Urls.HUB} component={Hubs} />
                    <Route path={Urls.QUESTION_FORMAT} exact component={Question} />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
