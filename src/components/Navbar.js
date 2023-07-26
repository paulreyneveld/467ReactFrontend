import * as React from 'react';
import { Toolbar,
         Button,
         Grid,
} from "@mui/material";
import { LoginButton } from "./buttons/LoginButton";
import { SignupButton } from './buttons/SignupButton';

export const Navbar = () => {
    return (
        <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        >    
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Button href="/" sx={{ mx: 8 }} variant="outlined">Home</Button>
            <Button sx={{ mx: 8 }} variant="outlined">Pets</Button>
            <LoginButton />
            <SignupButton />
        </Toolbar>
        </Grid>
    );
}

