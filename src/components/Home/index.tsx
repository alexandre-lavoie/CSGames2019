import React, { useState, useEffect } from 'react';
import { Grid, Avatar, Paper, Typography, Table, List, ListItem, ListItemText, Divider, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Firebase from '../Firebase';
import Loading from '../Loading';
import { IQuestion } from '../QuestionCard';

const Home: React.FC = () => {

    const [questions, setQuestions] = useState<[IQuestion] | null>(null);

    useEffect(() => {
        Firebase.getQuestions(setQuestions);
    }, []);

    if(Firebase.user && Firebase.user.user && questions) {
        let solved = questions.filter(q => q.submissions?.find(s => Firebase.user && Firebase.user.user && s.user === Firebase.user.user.uid) != null);

        let scores: {[key: string]: number} = {};

        questions.forEach(q => q.submissions?.forEach(s => {
            if(s.valid) {
                if(s.user in scores) {
                    scores[s.user] += 1;
                } else {
                    scores[s.user] = 1;
                }
            }
        }));

        return (
            <Grid container justify='center' style={{width: '100%', height:'90%', padding: '10px'}} spacing={2}>
                <Grid item container direction='column' xs={12} sm={10} md={8} lg={4} spacing={2}>
                    <Grid item>
                        <Paper style={{padding: '10px'}}>
                            <Grid container alignItems='center' spacing={3}>
                                <Grid item>
                                    <Avatar style={{width: '84px', height: '84px'}} alt='' src={(Firebase.user.user.photoURL) ? Firebase.user.user.photoURL : 'http://'} />
                                </Grid>
                                <Grid item>
                                    <Typography variant='h4'>{Firebase.user.user.displayName}</Typography>
                                    <Typography>Noob</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <List>
                                {
                                    solved.map((q, i) => (
                                        <div key={i}>
                                            <ListItem>
                                                <ListItemText primary={q.title} />
                                            </ListItem>
                                            {(i + 1 < solved.length) ? <Divider /> : <></>}
                                        </div>
                                    ))
                                }
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Position
                                    </TableCell>
                                    <TableCell>
                                        ID
                                    </TableCell>
                                    <TableCell>
                                        Score
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.entries(scores).map(([u, s], i) => (
                                        <TableRow key={i}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell>{u}</TableCell>
                                            <TableCell>{s}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        );
    } else {
        return <Loading />;
    }
}

export default Home;