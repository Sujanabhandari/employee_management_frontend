import React, { useState } from "react";
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Stack } from "@mui/system";
import EditEmployee from "./EditEmployee";
import { Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { toast } from "react-toastify";
import { deleteEmployee } from "../utils/auth";

function Employee() {
    const { user, employees, setEmployees, pageLimit, setPage, setPageSize, page, pageSize, rowCountState } = useMainContext();
    const [modalShow, setModalShow] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({});
    const columns = [
        // {
        //     field: 'sn',
        //     headerName: 'SN',
        //     width: 50,
        //     filterable: false,
        //     renderCell: (params) => params.api.getRowIndex(params.row._id) + 1
        // },
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
            field: 'city',
            headerName: 'Address',
            filterable: false,
            width: 135
        },
        {
            field: 'role',
            headerName: 'Role',
            filterable: false,
            type: 'number',
            width: 135,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            filterable: false,
            renderCell: (params) => {
                const deleteClick = async (e) => {
                    e.preventDefault();
                    const currentRow = params.row;
                    if (currentRow._id === user._id) {
                        toast.warning('You cannot delete yourself');
                        return;
                    }
                    const { error } = await deleteEmployee(currentRow._id);

                    if (error) {
                        toast.error('Employee could not be deleted');
                        return;
                    }
                    setEmployees(current => current.filter(emp => emp._id !== currentRow._id));
                    toast.success('Employee deleted successfully');
                };

                return (
                    <Stack direction="row">
                        <Button onClick={() => {
                            setCurrentEmployee(params.row);
                            setModalShow(true);
                        }} >
                            <EditIcon color="action" fontSize="medium" />
                        </Button>
                        <Button component={Link} to={`/employee/${params.row._id}`}>
                            <AccountBoxIcon color="action" fontSize="medium" />
                        </Button>
                        <Button onClick={deleteClick}>
                            <DeleteIcon color="action" fontSize="medium" />
                        </Button>
                    </Stack>
                );
            },
        }
    ];
    
    return (
        <>
            <Box mt={4} sx={{ height: 600, width: '100%' }}>
                <Typography align="center" variant="h5" mb={3}>Employees Information</Typography>
                <DataGrid
                    rows={employees}
                    rowCount={rowCountState}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    pageSize={pageSize}
                    autoPageSize
                    page={page}
                    paginationMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    columns={columns}
                    getRowId={(row, index) => row._id}
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
