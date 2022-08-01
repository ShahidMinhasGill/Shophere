import * as React from 'react';
import { useHistory } from "react-router-dom"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CssBaseline, Grid, Link, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function AddProduct({ modalShow, setModalShow }) {
    const [open, setOpen] = React.useState(false);
    // const title = React.useRef();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    // const [category, setCategory] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [quintity, setQuintity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [img, setImg] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();


    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleClose = () => {
        setModalShow(false)
    };

    function onChange(e) {
        setImg(URL.createObjectURL(e.target.files[0]));
        console.log('onchange function', e.target.files[0].name);

    }

    const handleSubmit = () => {
        setLoading(true)
        console.log('handle submit', img);
        const addProduct = { title, description, category, quintity, price, img };
        fetch('http://localhost:8000/products', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(addProduct)
        }).then(() => {
            console.log('new product added');
            setLoading(false);
            window.location.reload()
            navigate('/admindashboard')
            console.log('then respones', img);
        })
        console.log(addProduct);
    };


    return (
        <div>

            <Dialog sx={{
                marginTop: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',


            }} open={modalShow} onClose={handleClose}>
                {/* <DialogTitle> Enter Email And New Password</DialogTitle> */}
                <DialogContent>
                    {/* <DialogContentText>
                        Enter your Email
                    </DialogContentText> */}
                    <Container style={{ background: 'white', borderRadius: '16px' }} component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',

                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 3 }} >
                                <Grid container spacing={2} >
                                    <Grid item xs={12}  >
                                        <TextField
                                            autoComplete="given-name"
                                            name="title"
                                            required
                                            fullWidth
                                            id="title"
                                            label="Title"
                                            // defaultValue={user1.name}
                                            autoFocus
                                            onChange={e => setTitle(e.target.value)}
                                        />
                                    </Grid>



                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            name="Description"
                                            autoComplete="Description"
                                            onChange={e => setDescription(e.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <FormControl sx={{}} fullWidth required>
                                            <InputLabel id="demo-select-small">Select Category</InputLabel>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={category}
                                                label="Select Category"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Cloths</MenuItem>
                                                <MenuItem value={20}>Watchs</MenuItem>
                                                <MenuItem value={30}>Mens</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} >
                                        <TextField
                                            required
                                            fullWidth
                                            name="Quintity"
                                            label="Quintity"
                                            id="quintity"
                                            autoComplete="Quintity"
                                            onChange={e => setQuintity(e.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            // type='number'
                                            id="price"
                                            label="Price "
                                            name="Price"
                                            autoComplete="price"
                                            onChange={e => setPrice(e.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            type='file'
                                            onChange={onChange}
                                        />
                                        {
                                            img && (
                                                <img src={img} width="400px" />
                                            )
                                        }
                                    </Grid>

                                </Grid>
                                {/* <Button style={{ background: '#2E3B55' }}
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
                                </Grid> */}
                            </Box>
                        </Box>

                    </Container>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {!loading &&
                        <Button
                            onClick={handleSubmit}>Submit</Button>
                    }
                    {loading &&
                        <Button
                            disabled
                            onClick={handleSubmit}>Submiting....</Button>
                    }

                </DialogActions>
            </Dialog>
        </div>
    );
}
