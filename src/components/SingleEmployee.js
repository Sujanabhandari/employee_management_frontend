import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useAuthContext } from "../context/AuthContext";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { useLocation, useParams, useNavigate, AbortedDeferredError } from "react-router-dom";
import { Container } from '@mui/system';
import Comment from "./Comment";
import Box from '@mui/material/Box';
import { getData } from "../utils/auth";

function SingleEmployee() {
    const { employees, setEmployees, user } = useAuthContext();
    const [comments, setComments] = useState([]);

    const { id } = useParams();
    let filteredEmployees = employees?.filter((employee) => employee?._id == id);
    const employee = (filteredEmployees && filteredEmployees[0]) || {};
    useEffect(() => {
        const getComments = async () => {
          try {
            const { data } = await getData(`http://localhost:3000/comments?employeeId=${id}`);
            setComments(data);
          } catch (error) {
            console.log(error)
          }
        };
        getComments();
      }, [id]);

    return (
        <>
            <Container maxWidth="sm">
                <Grid style={{ margin: 20 }}>
                    <Typography variant="h4">
                        <strong>Employee Information</strong>
                    </Typography>
                </Grid>

                <Grid container spacing={3} item alignItems="center" justify="center">
                    <Grid item xs={12} md={8}>

                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {employee?.firstName} {employee?.lastName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Role:{employee?.role} email:{employee?.role}
                                </Typography>
                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Comment employeeId={id} setComments={setComments}/>
                    </Grid>
                    <Grid item xs={12}>
                        {comments?.map((singleComment, index) => 
                        <Typography variant="body2" key={index} color="text.secondary">
                            {singleComment.message}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default SingleEmployee;
