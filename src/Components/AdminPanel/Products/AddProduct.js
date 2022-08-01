import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0');
const theme = createTheme({
    palette: {
        background: {
            default: "#222222",
        },

    },
});


export default function AddProduct() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [quantity, setQuintity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [img, setImg] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [file, setFile] = React.useState(``)

    const navigate = useNavigate();


    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    function onChange(e) {
        setFile(e.target.files[0])
        setImg(URL.createObjectURL(e.target.files[0]));
        console.log('onchange function', e.target.files[0].name);

    }
    const goBack = () => {
        navigate('/admindashboard');
    }
    const handleSubmit = () => {
        setLoading(true)
        const addData = async () => {
            try {
                const added = await client.add(file);
                const picUrl = `https://ipfs.infura.io/ipfs/${added.path}`
                const response = await axios.post(' http://localhost:8000/products/', {
                    "title": title,
                    "description": description,
                    "category": category,
                    "quantity": quantity,
                    "price": price,
                    "img": picUrl,
                });
                console.log('Add data', response.data);
                // setLoading(false);
                // getAllProduct();
                navigate('/admindashboard')
            } catch (error) {
                console.log('data not Add', error);
            }

            // setOpen(false);

        }
        addData();
    }



    return (
        <>
            <div class="back-button" onClick={() => goBack()}>
                <div class="arrow-wrap">
                    <span class="arrow-part-1"></span>
                    <span class="arrow-part-2"></span>
                    <span class="arrow-part-3"></span>
                </div>
            </div>
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

                        <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                            Add Product
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
                                                {/* <em>None</em> */}
                                            </MenuItem>
                                            <MenuItem value="Clothes">Cloths</MenuItem>
                                            <MenuItem value="Watches">Watchs</MenuItem>
                                            <MenuItem value="Electronic">Electronic</MenuItem>

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
                                        type="number"
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
                                        type="number"
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

                    {!loading &&
                        <Button style={{ background: '#2E3B55' }}
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={handleSubmit}
                        >
                            Add Products
                        </Button>
                        // <Button
                        //     onClick={handleSubmit}>Submit</Button>
                    }
                    {loading &&
                        <Button style={{ background: '#2E3B55' }}
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{ mt: 3 }}
                            disabled
                            onClick={handleSubmit}
                        >
                            Add Products
                        </Button>
                        // <Button
                        //     disabled
                        //     onClick={handleSubmit}>Submiting....</Button>
                    }
                </Container>

            </ThemeProvider >
        </>
    );
}