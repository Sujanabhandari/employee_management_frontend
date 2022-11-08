
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { useAuthContext } from "../context/AuthContext";
import { register, postData } from "../utils/auth";
import React, { useState, useEffect } from "react";
import Input from '@mui/material/Input';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from 'react-router-dom';

function CsvUpload() {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const [isError, setIsError] = useState(false);
    const { setEmployees } = useAuthContext();

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
        handleOnSubmit(e);
    };
    const navigate = useNavigate();
    
    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(";");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        const array = csvRows.map(i => {
            const values = i.split(";");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        setArray(array);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (file && file.type == "text/csv") {
            setIsError(false)
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };
            fileReader.readAsText(file);
        }
        else {
            setIsError(true)
        }
    };
    const headerKeys = Object.keys(Object.assign({}, ...array));
    console.log(array);

    const addEmployees = async (e) => {
        try {
            e.preventDefault();
            const response  = await postData(`http://localhost:3000/users`, {
                users: [...array]
            });
            setEmployees((prev) => [...prev, ...response.data]);
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error)
        }
    };
    


    return (

        <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>
                Import Employees from CSV File
            </Typography>
            <Grid container component="form" spacing={2} noValidate>
                <Grid item xs={12} sm={6} >
                    <Input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" onClick={addEmployees}>
                        Add Employees
                    </Button>
                </Grid>
            </Grid>

            {isError ? (<Alert severity="error">
                <AlertTitle>File Type Error</AlertTitle>
                Please Upload Only CSv File
            </Alert>) : (<TableContainer component={Paper}>
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
            </TableContainer>)}


        </Container>

    );
}

export default CsvUpload;