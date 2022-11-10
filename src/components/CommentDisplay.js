import React from "react";
import ReactDOM from "react-dom";
import { Grid, Paper, Divider } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';
import { timeDifference } from "../utils/time";

const CommentDisplay = ({ comment }) => {
    return (
        <>
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>
                            {comment?.authorId?.firstName?.charAt(0).toUpperCase() + comment?.authorId?.lastName?.charAt(0).toUpperCase()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={comment?.authorId?.firstName}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                    noWrap    
                                >
                                    {comment?.message}
                                </Typography>
                                <br />
                                {timeDifference(Date.now(), new Date(comment?.date))}
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