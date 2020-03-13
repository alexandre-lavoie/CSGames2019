import React from 'react';
import Firebase from '../Firebase';
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Urls } from '../../urls';

const Login: React.FC = () => {
    const history = useHistory();

    if(Firebase.user && Firebase.user.user) {
        history.push(Urls.HOME);
    }

    return (
        <Grid container justify='center' alignItems='center' style={{ height: '90vh' }}>
            <Grid item>
                <Paper style={{ padding: '20px' }}>
                    <Grid container justify='center' spacing={4}>
                        <Grid container justify='center' item xs={12}>
                            <Typography variant='h4'>Login with Google</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant='outlined' onClick={() => Firebase.googleLogin()}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Login;