import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase';
import QuestionCard, { IQuestion } from '../QuestionCard';
import Loading from '../Loading';
import { Grid, Fab, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Urls } from '../../urls';
import { Add as AddIcon } from '@material-ui/icons';

const Problems: React.FC = () => {

    const [questions, setQuestions] = useState<[IQuestion] | null>(null);

    const history = useHistory();

    useEffect(() => {
        Firebase.getQuestions(setQuestions);
    }, []);

    if (questions == null) {
        return <Loading />
    }

    return (
        <>
            <Grid style={{ width: '100%', margin: '0' }} justify='flex-start' container spacing={3}>
                {
                    questions.map((question, i) => <Grid key={i}  xs={12} sm={6} lg={3} item>
                        <QuestionCard id={question.id} short title={question.title} description={question.description} submissions={question.submissions} onView={() => history.push(Urls.QUESTION_FORMAT.replace(':id', question.id))} />
                    </Grid>)
                }

            </Grid>
            <Tooltip title="Create">
                <Fab onClick={() => history.push(Urls.CREATOR)} style={{position: 'fixed', bottom:'30px', right: '30px'}} color='secondary'>
                    <AddIcon />
                </Fab>
            </Tooltip>
        </>
    );
}

export default Problems;