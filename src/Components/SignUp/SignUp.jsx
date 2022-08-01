import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, makeStyles, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import './SignUp.css';
import axios from 'axios';
import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0');
// const useStyles = makeStyles({
//     input: {
//         '& input[type=number]': {
//             '-moz-appearance': 'textfield'
//         },
//         '& input[type=number]::-webkit-outer-spin-button': {
//             '-webkit-appearance': 'none',
//             margin: 0
//         },
//         '& input[type=number]::-webkit-inner-spin-button': {
//             '-webkit-appearance': 'none',
//             margin: 0
//         }
//     },
// });

const theme = createTheme({
    palette: {
        background: {
            default: "#222222",
        },

    },
});


export default function SignUp() {
    // const classes = useStyles();

    const fullName = React.useRef(null);
    const emailAddress = React.useRef(null);
    const homeAddress = React.useRef(null);
    const mobileNo = React.useRef(null);
    const pwd = React.useRef(null);
    const newPic = React.useRef(null);
    const [img, setImg] = React.useState('');
    const [newImg, setNewImg] = React.useState('');
    const [file, setFile] = React.useState(``)
    const navigate = useNavigate();
    const formSchema = Yup.object().shape({
        fullName: Yup.string()
            .required("Full name is mandatory"),
        email: Yup.string()
            .required("Email is mandatory")
            .matches(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Enter a valid email address"
            ),
        mobileNo: Yup.number()
            // .required('Password is mendatory')
            .min(8, 'Password must be at 8 char long'),
        password: Yup.string()
            .required('Password is mendatory')
            .min(3, 'Password must be at 3 char long'),
        confirmPwd: Yup.string()
            .required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    function onChange(e) {
        setFile(e.target.files[0])
        setImg(URL.createObjectURL(e.target.files[0]));
    }
    const onSubmit = async () => {

        const fname = fullName.current.value
        const email = emailAddress.current.value
        const address = homeAddress.current.value
        const phoneNo = mobileNo.current.value
        const password = pwd.current.value
        // const img = newImg.current.value
        const added = await client.add(file);
        const picUrl = `https://ipfs.infura.io/ipfs/${added.path}`

        const user = {
            "fullName": fname,
            "email": email,
            "address": address,
            "phoneNo": phoneNo,
            "password": password,
            "img": picUrl,

        }
        const addUser = async () => {

            const response = await axios.post(
                'http://localhost:8000/users/', user);
            console.log(response.data);

        }
        addUser();
        navigate('/');
    };

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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }} >
                        <Grid container spacing={2} >
                            <Grid item xs={12}  >
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    inputRef={fullName}

                                    autoFocus
                                    {...register("fullName", { required: true })}
                                />
                                {errors.fullName && <> &nbsp;<span style={{ color: "red" }}>{errors.fullName.message}</span></>}
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    inputRef={emailAddress}
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <> &nbsp;<span style={{ color: "red" }}>{errors.email.message}</span></>}

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="Address"
                                    autoComplete="Address"
                                    inputRef={homeAddress}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone No"
                                    name="Phone No"
                                    autoComplete="Phone No"
                                    type='number'
                                    inputRef={mobileNo}
                                    {...register('mobileNo')}
                                    className={`form-control  ${errors.mobileNo ? 'is-invalid' : ''}`}

                                />
                                <div className="invalid-feedback">{errors.mobileNo?.message}</div>
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="match"
                                    label="Match Password"
                                    name="password"
                                    type="password"
                                    autoComplete="Match Password"
                                    {...register('confirmPwd')}
                                    className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}

                                />
                                <div className="invalid-feedback">{errors.confirmPwd?.message}</div>

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    type='file'
                                    onChange={onChange}
                                    inputRef={newPic}
                                />
                                {
                                    img && (
                                        <img src={img} width="400px" />
                                    )
                                }
                            </Grid>

                        </Grid>
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
                                <Link to='/' variant="body2">
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