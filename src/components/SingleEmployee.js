import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useAuthContext } from "../context/AuthContext";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {  useParams } from "react-router-dom";
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

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justify="center"
                        justifyContent="center"
                    >
                        <Grid item sm={12} md={6}>
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
                        <Grid item sm={12} md={6}>
                            <Comment employeeId={id} setComments={setComments} comments={comments} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default SingleEmployee;
