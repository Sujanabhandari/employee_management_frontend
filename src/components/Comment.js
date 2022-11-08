import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { postData } from '../utils/auth';
import { useAuthContext } from "../context/AuthContext";

const Comment = ({employeeId, setComments}) => {
  const { user } = useAuthContext();
  console.log(user._id);

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log("Form", formData.get("message"));
        const response = await postData('http://localhost:3000/comments',{
          message: formData.get('message'),
          employeeId: employeeId,
          authorId: user._id,
        });
        setComments((prev) => [...prev, response.data]);
    }
    catch (error) {
        console.log(error);
    }
};

  return (
    <><Typography>
      <strong>Comment</strong>
    </Typography>
      <Grid component="form" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Type something here…"
          minRows={3}
          id="message"
          name="message"
          endDecorator={<Box
            sx={{
              display: 'flex',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            <Button sx={{ ml: 'auto' }} type="submit">Comment</Button>
          </Box>}
          sx={{
            minWidth: 300,
          }} />
      </Grid></>
  );
}

export default Comment;