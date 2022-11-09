import React from "react";
import ReactDOM from "react-dom";

import { Grid, Paper, Divider } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {deepPurple } from '@mui/material/colors';

const CommentDisplay = ({ message, comments }) => {
    console.log("Single Message", comments?.authorId?.firstName?.charAt(0)+comments?.authorId?.lastName?.charAt(0));

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: deepPurple[500]}}>
                        {comments?.authorId?.firstName?.charAt(0).toUpperCase()+ comments?.authorId?.lastName?.charAt(0).toUpperCase()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={comments?.authorId?.firstName}
                        secondary={
                            <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                             {message}
                            </Typography>
                            <br />
                            {new Date(comments?.date).toLocaleDateString()}
                          </React.Fragment>
                        }
                    />
                     
                    
                </ListItem>
                <Divider variant="inset" component="li" />
            </List>
        </>
    );
}

export default CommentDisplay;