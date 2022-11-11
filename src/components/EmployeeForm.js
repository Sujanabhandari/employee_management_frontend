import React from 'react'
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';


export default function EmployeeForm({ errors, employee, action }) {
    return (
        <><Grid item xs={12} sm={6}>
            <TextField
                id="firstName"
                name="firstName"
                label="First name"
                defaultValue={employee?.firstName}
                fullWidth
                variant="standard"
                autoFocus />
        </Grid><Grid item xs={12} sm={6}>
                <TextField
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    defaultValue={employee?.lastName}
                    fullWidth
                    variant="standard" />
            </Grid><Grid item xs={12}>
                <TextField
                    id="userName"
                    name="userName"
                    defaultValue={employee?.userName}
                    label="Username"
                    fullWidth
                    variant="standard" />
            </Grid><Grid item xs={12}>
                <TextField
                    error={errors?.email}
                    id="email"
                    name="email"
                    defaultValue={employee?.email}
                    label="Email"
                    fullWidth
                    type="email"
                    variant="standard" />
            </Grid><Grid item xs={12} sm={8}>
                <TextField
                    id="street"
                    name="street"
                    defaultValue={employee?.street}
                    label="Street"
                    fullWidth
                    variant="standard" />
            </Grid><Grid item xs={12} sm={4}>
                <TextField
                    id="housenumber"
                    name="housenumber"
                    defaultValue={employee?.housenumber}
                    label="House number"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard" />
            </Grid><Grid item xs={12} sm={4}>
                <TextField
                    id="postcode"
                    name="postcode"
                    defaultValue={employee?.postcode}
                    label="Postcode"
                    fullWidth
                    variant="standard" />
            </Grid><Grid item xs={12} sm={8}>
                <TextField
                    id="city"
                    name="city"
                    defaultValue={employee?.city}
                    label="City"
                    fullWidth
                    variant="standard" />
            </Grid><Grid item xs={12}>
                <TextField
                    id="country"
                    name="country"
                    defaultValue={employee?.country}
                    label="Country"
                    fullWidth
                    variant="standard" />
            </Grid><Grid item xs={12}>
                <TextField
                    id="role"
                    name="role"
                    defaultValue={employee?.role}
                    label="Your role in Company"
                    fullWidth
                    variant="standard" />
            </Grid><Grid item xs={12}>
                <Button type="submit" fullWidth variant="contained" color="secondary">{action}</Button>
            </Grid></>
)
}
