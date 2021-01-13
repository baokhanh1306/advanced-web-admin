import { Grid, ListItem } from '@material-ui/core';
import React from 'react';
import Message from './Message';

const Chat = ({ conversation }) => {
	return <Grid item xs={12}>
        {conversation.map((msg,index) => (
            <ListItem key={index}>
                <Grid container>
                    <Message username={msg.user} message={msg.value} align="right" />
                </Grid>
            </ListItem>
        ))}
    </Grid>;
};

export default Chat;
