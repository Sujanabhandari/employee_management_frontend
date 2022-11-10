import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useLocation, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Stack } from "@mui/system";
import { deleteEmployee } from "../utils/deleteEmployee";
import EditEmployee from "./EditEmployee";
import { Typography } from "@mui/material";

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
            filterable: false,
            width: 135
        },
        {
            field: 'email',
            headerName: 'Email',
            filterable: false,
            width: 135
        },
        {
            field: 'userName',
            headerName: 'UserName',
            filterable: false,
            width: 135
        },
        {
            field: 'address',
            headerName: 'Address',
            filterable: false,
            width: 135
        },
        {
            field: 'role',
            headerName: 'Role',
            filterable: false,
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
            <Box sx={{ height: 500, width: '100%' }}>
                <Typography align="center" variant="h5" mb={3}>Employee Information</Typography>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={5}
                    getRowId={(row, index) => row._id}
                     rowsPerPageOptions={[5, 10, 20]}
                    experimentalFeatures={{ newEditingApi: true }}
                    disableColumnFilter 
                />
                <EditEmployee employee={currentEmployee} show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Box>
        </>
    );
}
export default Employee;
