import { Grid, ListItemText, Typography } from '@material-ui/core';
import React from 'react';

const Message = ({ username, message, align }) => {
	return <Grid item xs={12}>
        <Typography variant="h6">{username}</Typography>
        <ListItemText primary={message} />
    </Grid>;
};

export default Message;
