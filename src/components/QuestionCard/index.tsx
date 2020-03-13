import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Card, CardHeader, CardContent, CardActions, IconButton, Typography, Grid, Tooltip } from '@material-ui/core';
import { Check as CheckIcon, Clear as CheckEmptyIcon, Search as SearchIcon } from '@material-ui/icons';
import Firebase from '../Firebase';

export interface IQuestion {
    id: string
    title: string
    description: string
    submissions?: [{
        user: string
        valid: boolean
    }]
    short?: boolean
}

export interface IQuestionCard {
    onView?: Function
}

const SHORT_SIZE = 100;

const QuestionCard: React.FC<IQuestion & IQuestionCard> = (props) => {
    const [isComplete] = useState<boolean>((props.submissions) ? (props.submissions.filter((e) => Firebase.user && e.user === Firebase.user.user?.uid && e.valid === true).length > 0) : false);
    const [pass] = useState<number>((props.submissions) ? props.submissions.filter((e) => e.valid).length : 0);
    const [fail] = useState<number>((props.submissions) ? props.submissions.length - pass : 0);

    return (
        <Card>
            <CardHeader
                title={props.title}
            />
            <CardContent>
                <Markdown source={(props.short) ? props.description.substring(0, SHORT_SIZE) + '...' : props.description} />
            </CardContent>
            <CardActions>
                <Grid container alignItems='center' spacing={1} xs={10}>
                    <Grid item>
                        <Tooltip title={`${(isComplete) ? 'Completed' : 'Incomplete'}`}>
                            <IconButton>
                                {
                                    (isComplete) ? <CheckIcon color='primary' /> : <CheckEmptyIcon />
                                }
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Total Success / Failure">
                            <Typography>{pass} / {fail}</Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid container justify='flex-end' xs>
                    <Grid item>
                        <Tooltip title={`View`}>
                            <IconButton disabled={isComplete} onClick={() => (props.onView) ? props.onView() : () => {}}>
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default QuestionCard;