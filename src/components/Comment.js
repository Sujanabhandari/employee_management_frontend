import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { postData } from '../utils/auth';
import { useMainContext } from "../context/MainContext";
// import { useMainContext } from '../context/MainContext';
import CommentDisplay from './CommentDisplay';
import { TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Comment = ({ employeeId, setComments, comments }) => {
  const { user } = useMainContext();
  const [text , setText] = useState("")

  console.log(user._id);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const response = await postData('http://localhost:3000/comments', {
        message: formData.get('message'),
        employeeId: employeeId,
        authorId: user._id,
      }
      );
      console.log()
      setComments((prev) => [response.data, ...prev]);
      toast.success("Comment is saved.")
      setText("");
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
          multiline="true"
          placeholder="Write your comment…"
          minRows={4}
          id="message"
          name="message"
          value={text ? text : ""}
          onChange={(e)=>setText(e.target.value)}
          style={{ width: "100%" }} />
          
          <Button sx={{ ml: 'auto' }} type="submit" variant="contained" color="secondary">Comment</Button>  
      
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