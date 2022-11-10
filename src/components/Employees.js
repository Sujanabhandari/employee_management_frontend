import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { useLocation, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from "@mui/system";
import { deleteEmployee } from "../utils/deleteEmployee";
import EditEmployee from "./EditEmployee";
import { Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Employee() {
    const { employees, setEmployees } = useAuthContext();
    const [modalShow, setModalShow] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({});

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
            width: 400,
            filterable: false,
            renderCell: (params) => {
                const deleteClick = async (e) => {
                    const currentRow = params.row;
                    const deleteRow = await deleteEmployee(e, currentRow._id);
                    setEmployees(current => current.filter(emp => emp._id !== currentRow._id));
                };

                return (
                    <Stack direction="row" spacing={1}>
                        <Button color="primary" size="small"
                            onClick={() => {
                                setCurrentEmployee(params.row);
                                setModalShow(true);
                            }} >
                            <EditIcon color="secondary" fontSize="large"
                            /> </Button>
                        <Button color="primary" size="small" onClick={() => {

                        }}><Link to={`/employee/${params.row._id}`}>
                                <AccountBoxIcon color="secondary" fontSize="large"
                                />
                            </Link></Button>
                        <Button color="error" size="small" onClick={deleteClick}>
                            <DeleteIcon fontSize="large"
                            />
                        </Button>
                    </Stack>
                );
            },
        }
    ];
    return (
        <>
            <Box mt="4" sx={{ height: 600, width: '100%', marginTop: '100px' }}>
                <Typography align="center" variant="h5" mb={3}>Employees Information</Typography>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={10}
                    getRowId={(row, index) => row._id}
                    rowsPerPageOptions={[20, 40, 80]}
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
