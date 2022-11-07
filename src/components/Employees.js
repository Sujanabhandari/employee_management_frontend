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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Stack } from "@mui/system";
import { deleteEmployee } from "../utils/deleteEmployee";

function Employee() {
    const { employee, setEmployee } = useAuthContext();
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
            width: 140,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 140,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 140,
            editable: true,
        },
        {
            field: 'userName',
            headerName: 'UserName',
            width: 140,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 140,
            editable: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            type: 'number',
            width: 140,
            editable: true,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            filterable: false,
            renderCell: (params) => {
                const onClick = async (e) => {
                    const currentRow = params.row;
                    const deleteRow = await deleteEmployee(e, currentRow._id);
                    setEmployee(current => current.filter(emp => emp._id !== currentRow._id));
                };

                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="primary" size="small" onClick={onClick}>Edit</Button>
                        <Button variant="outlined" color="error" size="small" onClick={onClick}>Delete</Button>
                    </Stack>
                );
            },
        }
    ];
    return (
        <>
            <Box sx={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={employee}
                    columns={columns}
                    pageSize={10}
                    getRowId={(row, index) => row._id}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
        </>
    );
}

export default Employee;
