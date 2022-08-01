import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
const theme = createTheme({
    palette: {
        background: {
            default: "#222222",
        },

    },
});


export default function LandingPage() {


    return (
        <ThemeProvider theme={theme}>
            <Container style={{ background: 'white', borderRadius: '16px' }} component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >

                    <Typography sx={{ mt: 3 }} component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }} >

                        <Button style={{ background: '#2E3B55' }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container sx={{ mt: 3 }} justifyContent="flex-end">
                            <Grid item>
                                Already have an account?

                                <Link to="/login">
                                    Sign in
                                </Link>

                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}