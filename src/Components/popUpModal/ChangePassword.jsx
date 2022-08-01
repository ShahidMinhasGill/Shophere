import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

export default function ChangePassword({ modalShow, setModalShow }) {
    const getId = localStorage.getItem('userId');

    const [open, setOpen] = React.useState(false);
    const emailAddress = React.useRef(null);
    const pwd = React.useRef(null);
    const navigate = useNavigate();
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
        confirmPwd: Yup.string()
            .required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, formState } = useForm(formOptions)
    const { errors } = formState

    const onSubmit = async (formData) => {
        const email = emailAddress.current.value
        const password = pwd.current.value
        const curruntId = getId
        console.log("here you have changed to Email", email);
        console.log("here you have changed to password", password);
        console.log("here you have changed to id", curruntId);
        const user = await axios
            .get("http://localhost:8000/users")
            .then((res) => checkEmail(res.data, formData));
        if (user) {
            console.log('changeee', user);
            if (user.email === email && user.id == curruntId) {
                await axios
                    .patch("http://localhost:8000/users/" + user.id, {
                        "password": password,
                    });
                toast.success('Password Changed!');
                setModalShow(false);
            } else {
                toast.error(`Please Enter Correct Email!`)
            }

        } else
            toast.error(`Dosn't Exist Email Please try again!`)
    };
    const checkEmail = (serverUsers, formData) => {
        const user = serverUsers.find(user => user.email === formData.email); // extract the email from the formData
        if (user) return user;
    };

    const handleClose = () => {
        setModalShow(false)
    };

    return (
        <div>

            <Dialog sx={{
                marginTop: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',


            }} open={modalShow} onClose={handleClose}>
                <DialogTitle> Enter Email And New Password</DialogTitle>
                <DialogContent >
                    {/* <DialogContentText>
                        Enter your Email
                    </DialogContentText> */}
                    <Grid item xs={12} sx={{ mt: 3 }}>
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
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="password"
                            label="New Password"
                            name="password"
                            autoComplete="password"
                            inputRef={pwd}
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <TextField
                            required
                            fullWidth
                            id="retypePassword"
                            label="Re Enter Password"
                            name="retypePassword"
                            autoComplete="retypePassword"
                            {...register('confirmPwd')}
                            className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}

                        />
                        <div className="invalid-feedback">{errors.confirmPwd?.message}</div>

                    </Grid>
                    <Toaster />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
