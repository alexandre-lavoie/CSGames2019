import React, { useState } from 'react';
import QuestionCard from '../QuestionCard';
import { Grid, TextField, Button } from '@material-ui/core';
import Firebase from '../Firebase';
import { useSnackbar } from 'material-ui-snackbar-provider';

const Creator: React.FC = () => {

    const [title, setTitle] = useState('Sample Question');
    const [description, setDescription] = useState('- Insert Markdown Here \n - Can include all standard *Markdown*');
    const [answer, setAnswer] = useState('CTF{123}');

    // For snackbars
    const snackbar = useSnackbar();

    return (
        <Grid style={{height: '90vh'}} container justify='center' alignItems='center'>
            <Grid item container xs={12} sm={6} direction='column' alignItems='center'>
                <QuestionCard id='0' title={title} description={description} />
            </Grid>
            <Grid item container direction='column' alignItems='center' spacing={3} xs={12} sm={6}>
                <Grid item xs={12}>
                    <TextField
                        id='question-title'
                        label='Title'
                        variant='outlined'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <TextField
                    style={{width:'90%'}}
                    id='question-description'
                    label='Question'
                    variant='outlined'
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Grid item xs={12}>
                    <TextField
                        id='question-answer'
                        label='Answer'
                        variant='outlined'
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button 
                        variant='outlined'
                        onClick={() => Firebase.createQuestion(title, description, answer, snackbar)}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Creator;