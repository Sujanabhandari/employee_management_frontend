import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useLocation, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Stack } from "@mui/system";
import { deleteEmployee } from "../utils/deleteEmployee";
import EditEmployee from "./EditEmployee";
import Modal from '@mui/material/Modal';
import SingleEmployee from "./SingleEmployee";

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


function Employee() {
    const { employees, setEmployees } = useAuthContext();
    const [modalShow, setModalShow] = useState(false);
    const [currentEmployee, setCurrentEmployee]  = useState({});

    const columns = [
        {
            field: 'sn',
            headerName: 'SN',
            width: 90,
            filterable: false,
            renderCell: (params) => params.api.getRowIndex(params.row._id) + 1
        },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 135
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 135
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 135
        },
        {
            field: 'userName',
            headerName: 'UserName',
            width: 135
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 135
        },
        {
            field: 'role',
            headerName: 'Role',
            type: 'number',
            width: 135
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 500,
            filterable: false,
            renderCell: (params) => {
                const deleteClick = async (e) => {
                    const currentRow = params.row;
                    const deleteRow = await deleteEmployee(e, currentRow._id);
                    setEmployees(current => current.filter(emp => emp._id !== currentRow._id));
                };
                
                return (
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" color="primary" size="small"
                            onClick={() => {
                                setCurrentEmployee(params.row);
                                setModalShow(true);
                            }} >
                            Edit</Button>
                        <Button variant="outlined" color="primary" size="small" onClick={() => {
                              
                            }}><Link to={`/employee/${params.row._id}`}>Details</Link></Button>
                        <Button variant="outlined" color="error" size="small" onClick={deleteClick}>Delete</Button>
                    </Stack>
                );
            },
        }
    ];

    return (
        <>
            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={10}
                    getRowId={(row, index) => row._id}
                    experimentalFeatures={{ newEditingApi: true }}
                />
                <EditEmployee employee={currentEmployee} show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Box>
        </>
    );
}

export default Employee;
