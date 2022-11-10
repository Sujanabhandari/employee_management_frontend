import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { postData } from '../utils/auth';
import { useAuthContext } from "../context/AuthContext";
import CommentDisplay from './CommentDisplay';
import { TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';

const Comment = ({ employeeId, setComments, comments }) => {
  const { user } = useAuthContext();
  console.log(user._id);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      console.log("Form", formData.get("message"));
      const response = await postData('http://localhost:3000/comments', {
        message: formData.get('message'),
        employeeId: employeeId,
        authorId: user._id,
      });
      setComments((prev) => [response.data, ...prev]);
    }
    catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Grid component="form" onSubmit={handleSubmit}>
        <Typography variant="h5">Comments</Typography>
        <TextareaAutosize
          placeholder="Write your comment…"
          minRows={4}
          id="message"
          name="message"
          style={{ width: "100%" }} />
          
          <Button sx={{ ml: 'auto' }} type="submit" variant="contained">Comment</Button>  
      
      </Grid>
      <Grid item xs={12}>
        {comments?.map((comment, index) =>
          <CommentDisplay key={index} comment={comment} />
        )}
      </Grid>
    </>

  );
}

export default Comment;