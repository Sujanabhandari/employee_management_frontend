import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { Link } from "react-router-dom";

function Employee() {
    const { user,
        setUser,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        employee,
        setEmployee } = useAuthContext();

    return (
        <Grid
            align="center"
            alignItems="center"
            justify="center"
        >
            <Grid style={{ margin: 20 }}>
                {employee.length>0? <Typography variant="h4">
                    <strong>Employee Information</strong>
                </Typography>: "" }
            </Grid>
            <Grid container item xs={12} spacing={2} alignItems="center" justify="center">
                {employee?.map((employee, index) => (
                    <Grid container item sm={12} key={index}>
                        <Link to={`/employee/${employee._id}`}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Name {employee.userName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Role:{employee.role} email:{employee.role}
                                    {employee.userName}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Edit</Button>
                                <Button size="small">Delete</Button>
                            </CardActions>
                        </Card>
                        </Link>
                    </Grid>
                ))}

            </Grid>
        </Grid>
    );
}

export default Employee;
