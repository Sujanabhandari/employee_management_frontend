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
import CommentDisplay from "./CommentDisplay";

function SingleEmployee() {
    const { employees, setEmployees, user } = useAuthContext();
    const [comments, setComments] = useState([]);

    const { id } = useParams();
    let filteredEmployees = employees?.filter((employee) => employee?._id == id);
    const employee = (filteredEmployees && filteredEmployees[0]) || {};
    console.log("page", employee)
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

            <Container>
                <Box sx={{ height: 650, width: '100%' }}>
                    <Grid style={{ margin: 20 }}>
                        <Typography variant="h4">
                            <strong>Employee Information</strong>
                        </Typography>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} item alignItems="center" justify="center"
                        justifyContent="center"
                    >
                        <Grid item xs={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {employee?.firstName} {employee?.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Role:{employee?.role} email:{employee?.role}
                                    </Typography>
                                    <Grid container spacing={2} mt={1}>
                                        <Grid item xs={6}>
                                        Role: {employee?.role}
                                        </Grid>
                                        <Grid item xs={6}>
                                        Address: {employee?.address}
                                        </Grid>
                                        <Grid item xs={6}>
                                        Username:  {employee?.userName}
                                        </Grid>
                                        <Grid item xs={6}>
                                        Joined Date: 
                                        {new Date(employee?.date).toLocaleDateString()}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Comment employeeId={id} setComments={setComments} />
                        </Grid>
                        <Grid item xs={12}>
                        <Typography variant="h6" color="text.secondary" mt={1}>
                            Comments
                        </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {comments?.map((singleComment, index) =>
                                <CommentDisplay message={singleComment.message} key={index} comments={singleComment} />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default SingleEmployee;
