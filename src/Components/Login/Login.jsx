import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkRouterDom } from 'react-router-dom';
import ForgetPassword from '../popUpModal/ForgetPasword';
import { Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

const theme = createTheme({
    palette: {
        background: {
            default: "#222222",
        },

    },
});


export default function Login() {
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is mandatory")
            .matches(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Enter a valid email address"
            ),
        password: Yup.string()
            .required('Password is mendatory')
            .min(3, 'Password must be at 3 char long'),
    });
    const navigate = useNavigate();
    const [modalShow, setModalShow] = React.useState(false);
    const emailAddress = React.useRef(null);
    const pwd = React.useRef(null);
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    const onSubmit = async (formData) => {
        const email = emailAddress.current.value
        const password = pwd.current.value
        const user = await axios
            .get("http://localhost:8000/users")
            .then((res) => checkEmail(res.data, formData));
        if (user) {
            if (user.id === 1) {
                if (user.password === password && user.email === user.email) {
                    localStorage.setItem('userId', user.id);
                    navigate('/admindashboard');
                    // window.location.reload(true);

                } else {
                    toast.error(`Dosn't Matched Email or Password!`)
                }
            } else if (user) {
                if (user.password === password && user.email === user.email) {
                    localStorage.setItem('userId', user.id);
                    navigate('/');
                    // window.location.reload(true);


                } else {
                    toast.error(`Dosn't Matched Email or Password!`)
                }
            }


        } else
            toast.error(`Dosn't Matched Email or Password!`)


    };
    const goBack = () => {
        navigate('/');
    }
    const checkEmail = (serverUsers, formData) => {
        const user = serverUsers.find(user => user.email === formData.email); // extract the email from the formData
        if (user) return user;
    };
    return (
        <ThemeProvider theme={theme}>
            <Container style={{ background: 'white', borderRadius: '16px' }} component="main" maxWidth="xs">
                <div className="back-button" onClick={() => goBack()}>
                    <div className="arrow-wrap">
                        <span className="arrow-part-1"></span>
                        <span className="arrow-part-2"></span>
                        <span className="arrow-part-3"></span>
                    </div>
                </div>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >
                    <Toaster />
                    <Typography sx={{ mt: 3 }} component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }} >
                        <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"

                                    inputRef={emailAddress}
                                    autoFocus
                                    {...register("email", { required: true })}
                                />

                                {errors.email && <> &nbsp;<span style={{ color: "red" }}>{errors.email.message}</span></>}
                            </Grid>


                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    inputRef={pwd}
                                    {...register('password')}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </Grid>

                        </Grid>
                        <Button style={{ background: '#2E3B55' }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>


                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => setModalShow(true)}
                                >
                                    Forget Password

                                </Link>
                            </Grid>
                            <ForgetPassword modalShow={modalShow} setModalShow={setModalShow} />
                        </Grid>
                        <Grid container sx={{ mt: 3 }} justifyContent="flex-end">
                            <Grid item>
                                don't have an account?
                                <LinkRouterDom to="/signup">
                                    Sign Up
                                </LinkRouterDom>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>


    );
}