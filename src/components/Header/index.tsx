import React from 'react';
import { AppBar, Typography, Toolbar, IconButton, Grid, Tooltip } from '@material-ui/core';
import { Home as HomeIcon, Edit as ProblemIcon, Room as HubIcon, Lock as LoginIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Urls } from '../../urls';
import grey from '@material-ui/core/colors/grey';
import Firebase from '../Firebase';

const Header: React.FC = () => {

    const history = useHistory();

    if (history.location.pathname !== Urls.LOGIN && !Firebase.isLoggedIn()) {
        history.push(Urls.LOGIN);
    }

    return (
        <AppBar position='static' style={{backgroundColor: grey[800]}}>
            <Toolbar>
                <Grid container>
                    <Grid item container xs alignItems='center'>
                        <Typography variant='h6' style={{cursor: 'pointer'}} onClick={() => history.push(Urls.HOME)}>
                            Rebel CS Games
                        </Typography>
                    </Grid>
                    <Grid item container justify='flex-end' xs spacing={1}>
                        <Grid item>
                            <Tooltip title='Home'>
                                <IconButton onClick={() => history.push(Urls.HOME)}>
                                    <HomeIcon color='secondary' />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title='Problems'>
                                <IconButton onClick={() => history.push(Urls.PROBLEM)}>
                                    <ProblemIcon color='secondary' />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title='Hubs'>
                                <IconButton onClick={() => history.push(Urls.HUB)}>
                                    <HubIcon color='secondary' />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title='Login'>
                                <IconButton onClick={() => history.push(Urls.LOGIN)}>
                                    <LoginIcon color='secondary' />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;