import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FetchProducts from '../popUpModals/FetchProduct';
import axios from 'axios';

const theme = createTheme({
    palette: {
        background: {
            default: "#222222",
        },

    },
});
export default function Update() {
    const { id } = useParams();
    // const { data: product, error } = FetchProducts('http://localhost:8000/products/' + id);
    // console.log(product);



    // console.log(title);


    // setTitle(product.title)







    // const handleSubmit = () => {
    //     setLoading(true)
    //     const addProduct = { title, description, category, quintity, price, img };
    //     fetch('http://localhost:8000/products' + id, {
    //         method: 'POST',
    //         headers: { "Content-type": "application/json" },
    //         body: JSON.stringify(addProduct)
    //     }).then(() => {
    //         console.log('new product added');
    //         setLoading(false);
    //         navigate('/admindashboard')
    //         console.log('then respones', img);
    //     })
    //     console.log(addProduct);
    // };


    // newName.current.value,
    let newtitle = React.useRef(null);
    let newdescription = React.useRef(null);
    let newCategory = React.useRef(null);
    let newquantity = React.useRef(null);
    let newprice = React.useRef(null);
    let newPic = React.useRef(null);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [quantity, setQuintity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [img, setImg] = React.useState('');
    const [newImg, setNewImg] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = React.useState([{
        title: '',
        description: '',
        category: '',
        quantity: '',
        price: '',
        img: ''
    }]);
    // let newtitle = React.useState([{
    //     title: title
    // }])
    // console.log(newtitle);
    const dataOnChange = (event) => {
        let tits = newtitle.current.value
        console.log("here you have changed to ", tits);
        setProduct([{
            title: newtitle.current.value,
        }])
        setTitle(newtitle.current.value);
        console.log('event.target.value');
    };
    // 04133730619200
    const descriptionOnChange = (event) => {
        let tits = newdescription.current.value
        console.log("here you have changed to description", tits);
        setProduct([{
            description: newdescription.current.value,
        }]);
        setDescription(newdescription.current.value);
        // setCategory(event.target.value);

        console.log(event.target.value);
    };
    // const categoryOnChange = (event) => {
    //     let tits = newCategory.current.value
    //     console.log("here you have changed to Category", tits);
    //     setProduct([{
    //         category: newCategory.current.value,
    //     }])
    //     console.log(event.target.value);
    // };
    const quantityOnChange = (event) => {
        let tits = newquantity.current.value
        console.log("here you have changed to Quantity", tits);
        setProduct([{
            quantity: newquantity.current.value,
        }]);
        setQuintity(newquantity.current.value)

        console.log(event.target.value);
    };
    function imgOnChange(e) {
        setImg(URL.createObjectURL(e.target.files[0]));
        console.log(img);
        let idFront = newPic.current.value;
        console.log("here you have changed to img", idFront);
        setProduct([{
            img: newPic.current.value,
        }])
        setImg(URL.createObjectURL(e.target.files[0]));
    }
    const priceOnChange = (event) => {
        let tits = newprice.current.value
        console.log("here you have changed to description", tits);
        setProduct([{
            price: newprice.current.value,
        }])
        setPrice(newprice.current.value);
        console.log(event.target.value);
    };
    const handleSubmit = () => {
        setLoading(true)
        console.log('handle submit', img);
        const addProduct = { title, description, quantity, price, img };
        if (title) {
            fetch('http://localhost:8000/products/' + id, {
                method: 'PUT',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(addProduct)
            }).then(() => {
                console.log('new product added');
                setLoading(false);
                navigate('/admindashboard')
                console.log('then respones', img);
            })
        } else if (title && description) {

        }


        console.log(newtitle);
    }

    React.useEffect(() => {

        const loadPost = async () => {
            const response = await axios.get(
                'http://localhost:8000/products/' + id);
            setProduct([{
                title: response.data.title,
                description: response.data.description,
                category: response.data.category,
                quantity: response.data.quantity,
                price: response.data.price,
                img: response.data.img,

            }])
        }
        loadPost();




    }, []);
    console.log('show product', product);
    return (
        <div>
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
                            Update Product
                        </Typography>
                        {product.map((i) => {
                            return (
                                <Box component="form" noValidate sx={{ mt: 3 }} >
                                    <Grid container spacing={2} >
                                        <Grid item xs={12}  >

                                            <TextField
                                                inputRef={newtitle}
                                                // ref={newtitle}
                                                autoComplete="given-name"
                                                name="title"
                                                required
                                                fullWidth
                                                id="title"
                                                label="Title"
                                                autoFocus
                                                value={i.title}
                                                onChange={dataOnChange}
                                            // onChange={e => setProduct([e.target.value])}
                                            // ref={newtitle}

                                            />
                                        </Grid>



                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                id="description"
                                                label="Description"
                                                name="Description"
                                                autoComplete="Description"
                                                value={i.description}
                                                onChange={descriptionOnChange}
                                                inputRef={newdescription}
                                            // onChange={e => setDescription(e.target.value)}
                                            // onChange={e => setProduct([e.target.value])}

                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>

                                            <FormControl sx={{}} fullWidth required>
                                                <InputLabel id="demo-select-small">Select Category</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={i.category}
                                                    label="Select Category"
                                                    ref={newCategory}
                                                    onChange={categoryOnChange}
                                                >
                                                    <MenuItem value={i.category}>
                                                    </MenuItem>
                                                    <MenuItem value="Clothes">Cloths</MenuItem>
                                                    <MenuItem value="Watches">Watchs</MenuItem>
                                                    <MenuItem value="Electronic">Electronic</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid> */}

                                        <Grid item xs={12} >
                                            <TextField
                                                required
                                                fullWidth
                                                name="Quantity"
                                                label="Quantity"
                                                id="quantity"
                                                value={i.quantity}
                                                autoComplete="Quantity"
                                                // onChange={e => setProduct([e.target.value])}
                                                // ref={newquantity}
                                                inputRef={newquantity}
                                                onChange={quantityOnChange}
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
                                                value={i.price}
                                                // ref={newprice}
                                                inputRef={newprice}
                                                onChange={priceOnChange}
                                            // onChange={e => setPrice(e.target.value)}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>

                                            {
                                                !img && (
                                                    <img src={i.img} width="200px" />
                                                )
                                            }
                                            <TextField
                                                required
                                                type='file'
                                                onChange={imgOnChange}
                                                inputRef={newPic}
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
                            )
                        })}
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
                            Adding.....
                        </Button>
                        // <Button
                        //     disabled
                        //     onClick={handleSubmit}>Submiting....</Button>
                    }
                </Container>

            </ThemeProvider>
        </div>
    )
}
