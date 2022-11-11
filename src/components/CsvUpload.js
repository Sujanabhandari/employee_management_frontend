import { Container } from '@mui/system';
import { useMainContext } from "../context/MainContext";
import { postData } from "../utils/auth";
import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Button, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import { csvFileToArray } from '../utils/file';

const CSVHEADERMAP = {
    'firstname': 'firstName',
    'vorname': 'firstName',
    'lastname': 'lastName',
    'nachname': 'lastName',
    'username': 'userName',
    'email': 'email',
    'street': 'street',
    'strasse': 'street',
    'no': 'housenumber',
    'nr': 'housenumber',
    'postcode': 'postcode',
    'zip': 'postcode',
    'plz': 'postcode',
    'city': 'city',
    'ort': 'city',
    'country': 'country',
    'land': 'country',
    'address': 'address',
    'role': 'role',
    'rolle': 'role'
}

const REQUIREDFIELDS = [
    'firstName',
    'lastName'
]

function CsvUpload() {
    const [file, setFile] = useState(null);
    const [array, setArray] = useState([]);
    const { setEmployees } = useMainContext();
    const fileInput = useRef();
    const navigate = useNavigate();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        if (file == null) return;
        if (file && file.type === "text/csv") {
            fileReader.onload = function (event) {
                const text = event.target.result;
                const { data, error } = csvFileToArray(text, CSVHEADERMAP, REQUIREDFIELDS);
                if (error) {
                    fileInput.current.value = "";
                    return;
                }
                setArray(data);
            };
            fileReader.readAsText(file);
        }
        else {
            toast.error('Only csv files are supported!');
        }
    }, [file])

    const headerKeys = Object.keys(Object.assign({}, ...array));

    const addEmployees = async (e) => {
        try {
            e.preventDefault();
            const { data, error } = await postData(`http://localhost:3000/users`, {
                users: [...array]
            });

            if (error) {
                throw new Error(error.response?.data.error || error.message);
            }
            setEmployees((prev) => [...data, ...prev]);
            toast.success()
            navigate('/', { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Import Employees from CSV File
            </Typography>
            <Grid container component="form" spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6} >
                    <Input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                        inputRef={fileInput}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button color="error" size="small" onClick={() => { fileInput.current.value = ""; setArray([]) }}>
                        <DeleteIcon fontSize="medium"
                        />
                    </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button variant="contained" color="secondary" fullWidth onClick={addEmployees}>
                        Add Employees
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headerKeys.map((key, index) => (
                                <TableCell align="right" key={index}>{key}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {array.map((item, index) => (
                            <TableRow
                                key={index}
                            >
                                {Object.values(item).map((val, index) => (
                                    <TableCell align="right" key={index}>{val}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default CsvUpload;
