import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, CardActions, TextField, IconButton } from '@material-ui/core';
import { IQuestion } from '../QuestionCard';
import Loading from '../Loading';
import { useParams } from 'react-router-dom';
import Firebase from '../Firebase';
import Markdown from 'react-markdown';
import { Search as SearchIcon } from '@material-ui/icons';
import { useSnackbar } from 'material-ui-snackbar-provider';

const Question: React.FC = () => {
    const [question, setQuestion] = useState<IQuestion | null>(null);
    const [answer, setAnswer] = useState('');
    const params = useParams<{id: string}>();
    const snackbar = useSnackbar()

    useEffect(() => {
        Firebase.getQuestion(params.id, setQuestion);
    });

    if(question == null){
        return <Loading />
    }

    return (
        <Grid style={{width: '100%', height: '80vh', padding: '10px'}} container alignItems='center' justify='center'>
            <Grid item xs>
                <Card>
                    <CardHeader
                        title={question.title}
                    />
                    <CardContent>
                        <Markdown source={question.description} />
                    </CardContent>
                    <CardActions>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <TextField
                                    style={{width:'100%'}}
                                    id='answer'
                                    label='Answer'
                                    variant='outlined'
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <IconButton onClick={() => Firebase.verifyQuestion(params.id, answer, snackbar)}>
                                    <SearchIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Question;