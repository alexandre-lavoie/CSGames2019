import React from 'react';
import { Grid } from '@material-ui/core';
import { motion } from 'framer-motion';
import { HourglassEmpty as HourglassEmptyIcon } from '@material-ui/icons';

const Loading: React.FC = () => {
    return (
        <Grid container alignItems='center' justify='center' style={{width: '100%', height: '87vh'}}>
            <motion.div
                initial={{
                    rotate: 0
                }}
                animate={{
                    rotate: 360
                }}
                transition={{
                    loop: 'Infinity',
                    ease: "linear",
                    duration: 2
                }}
            >
                <HourglassEmptyIcon style={{width: '150px', height: '150px'}}/>
            </motion.div>
        </Grid>
    );
}

export default Loading;