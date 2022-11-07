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
import editModal from "../utils/editModal";
import EditEmployee from "./EditEmployee";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { deleteEmployee } from "../utils/deleteEmployee";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function SingleEmployee() {
    const { employees, setEmployees } = useAuthContext();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { id } = useParams();

    const clickedEmployee = employees?.filter((employee) => employee?._id == id);
    const resultId = clickedEmployee[0]?._id;
    console.log(resultId)
    const navigate = useNavigate();

    const deleteEmployee = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.delete(
                `http://localhost:3000/users/${resultId}`,
                {
                    headers: { 'Authorization': `${localStorage.getItem("token")}` }
                }
            );
            navigate('/home', { replace: true });
        } catch (error) {
            console.log(error)
        }
    };

    const editEmployee = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const { data } = await axios.put(
                `http://localhost:3000/users/${resultId}`,
                {
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    username: formData.get('username'),
                    email: formData.get('email'),
                    address: formData.get('address'),
                    role: formData.get('role'),
                    password: formData.get('password'),
                },

                {
                    headers: { 'Authorization': `${localStorage.getItem("token")}` }
                }
            );
            navigate('/home', { replace: true });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            {clickedEmployee?.map((employee, index) => (
                <Container maxWidth="sm" key={index}>
                    <Grid style={{ margin: 20 }}>
                        <Typography variant="h4">
                            <strong>Employee Information</strong>
                        </Typography>
                    </Grid>

                    <Grid container item xs={12} alignItems="center" justify="center">
                        <Grid container item sm={6}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {employee.userName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Role:{employee.role} email:{employee.role}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={handleOpen}>Edit</Button>
                                    <Button size="small" onClick={deleteEmployee}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>

{/* For edit employee field */}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                   Edit Employee
                                </Typography>
                               <EditEmployee type={"Save"} handleFunction={editEmployee} 
                               employee={clickedEmployee ? clickedEmployee[0] : {}}/>
                            </Box>
                        </Modal>


                    </Grid>
                </Container>
            ))}
        </>
    );
}

export default SingleEmployee;
