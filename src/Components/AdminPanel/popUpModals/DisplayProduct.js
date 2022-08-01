import * as React from 'react';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from '@mui/material';
import { Link as LinkRouterDom, useParams } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import FetchProducts from './FetchProduct';
import HomePage from '../../HomePage/HomePage';
import toast, { Toaster } from 'react-hot-toast';

import { create } from 'ipfs-http-client';
import Dashboard from '../Dashboard';
const client = create('https://ipfs.infura.io:5001/api/v0');
const Item = ({ name, category, product }) => (
    <div className="item-container">
        {/* <div>
            <span className="item-label">Name:</span>
            {name}
        </div> */}
        {/* <div>
            <span className="item-label">Name:</span>
            {product}
        </div> */}
        <div>
            <span className="item-label">Category:</span>
            {category}
        </div>
    </div>
);
export default function DisplayProduct() {
    // const { id } = useParams();
    let newtitle = React.useRef(null);
    let newdescription = React.useRef(null);
    let newCategory = React.useRef(null);
    let newquantity = React.useRef(null);
    let newprice = React.useRef(null);
    let newPic = React.useRef(null);
    const [modalShow, setModalShow] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [quantity, setQuintity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [img, setImg] = React.useState('');
    const [getId, setId] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [sportList, setSportList] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState();
    const [file, setFile] = React.useState(``)
    const [pic1, setpic1] = React.useState(false)
    const [delOpen, setDelOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [product, setProduct] = React.useState([]);

    const setSaveData = (i) => {
        console.log(i.id, 'set data');
        setData(i.id);
        setDelOpen(true);
    }

    const navigate = useNavigate();


    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    function onChange(e) {
        setpic1(true)
        setFile(e.target.files[0])
        setImg(URL.createObjectURL(e.target.files[0]));
        console.log('onchange function', e.target.files[0].name);

    }
    // const handleClick = () => {
    //     console.log(product);
    // }


    const [open, setOpen] = React.useState(false);
    const getAllProduct = async () => {
        const response = await axios.get(
            'http://localhost:8000/products/');
        setProduct(response.data)
    }
    const handleClickOpen = (id) => {
        console.log('get id', id);
        setOpen(true);
        const getProductOnclick = async () => {
            const response = await axios.get(
                'http://localhost:8000/products/' + id);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setCategory(response.data.category);
            setQuintity(response.data.quantity);
            setPrice(response.data.price);
            setImg(response.data.img);
            setId(response.data.id);

        }
        getProductOnclick();

    };

    const handleDelete = (data) => {
        const delProduct = async () => {
            await axios.delete(
                'http://localhost:8000/products/' + data);
        }
        delProduct();
        setDelOpen(false);
        getAllProduct();
    };

    const handleUpdateData = () => {
        const upadateData = async () => {
            try {
                const added = await client.add(file);
                const picUrl = `https://ipfs.infura.io/ipfs/${added.path}`
                setImg(picUrl);
                if (pic1 === true) {
                    const response = await axios.put(' http://localhost:8000/products/' + getId, {
                        "title": title,
                        "description": description,
                        "category": category,
                        "quantity": quantity,
                        "price": price,
                        "img": picUrl,
                    });
                } else {
                    // let fffPic = img;
                    const response = await axios.put(' http://localhost:8000/products/' + getId, {
                        "title": title,
                        "description": description,
                        "category": category,
                        "quantity": quantity,
                        "price": price,
                        "img": img,
                    });
                    console.log('update data', response.data);
                }


                // getAllProduct();
            } catch (error) {
                console.log('data not update', error);
            }
            getAllProduct();
            setOpen(false);
            // window.location.reload(true)
        }
        upadateData();
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseDelete = () => {
        setDelOpen(false);
    };

    var defaultSports = [
        {
            name: "Table Tennis",
            category: "Watches"
        },
        {
            name: "T-Shirt",
            category: "Clothes"
        },
        {
            name: "Swimming",
            category: "Electronic"
        },
        {
            name: "Chess",
            category: "Watches"
        },
        {
            name: "Men Dress",
            category: "Clothes"
        }
    ];
    function getFilteredList() {
        // Avoid filter when selectedCategory is null
        if (!selectedCategory) {
            return product;
        }
        return product.filter((product) => product.category === selectedCategory);
    }
    var filteredList = React.useMemo(getFilteredList, [selectedCategory, product]);
    console.log('filteredList', filteredList);
    function handleCategoryChange(event) {
        setSelectedCategory(event.target.value);
    }
    const handleOnChange = () => {
        handleCategoryChange();
        // handleChange();
    }
    // console.log(defaultSports);
    React.useEffect(() => {
        getAllProduct();
    }, []);
    return (
        <div>






            {/* <div className="sport-list">
                {filteredList.map((element, index) => (
                    <Item {...element} key={index} />
                ))}
            </div> */}
            <FormControl sx={{ mb: 2, width: '10rem' }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={category}
                    label="Category"
                    // onChange={handleOnChange}
                    // onChange={handleChange}
                    onChange={(e) => { handleCategoryChange(e); handleChange(); }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Clothes">Clothes</MenuItem>
                    <MenuItem value='Watches'>Watches</MenuItem>
                    <MenuItem value='Electronic'>Electronic</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {/* <select
                    name="category-list"
                    id="category-list"
                    onChange={handleCategoryChange}
                >
                    <option value="">All</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Watches">Watches</option>
                    <option value="Electronic">Electronic</option>
                </select> */}

                {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl> */}
                {filteredList.map((i) => {

                    // <Item {...element} key={i} />
                    return (
                        <>

                            <Grid item xs={2} sm={4} md={4} key={i}>

                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={i.img}
                                        alt="Paella dish"
                                    />
                                    <CardContent>

                                        <Typography variant="body2" color="text.secondary">
                                            {i.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {i.description}
                                        </Typography>
                                        <br></br>
                                        <Typography variant="body2" color="text.secondary">
                                            {i.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>

                                        {/* <LinkRouterDom to={`/update/${i.id}`} > */}
                                        <IconButton aria-label="add to favorites"

                                        >
                                            <EditIcon onClick={() => handleClickOpen(i.id)} />
                                        </IconButton>
                                        {/* </LinkRouterDom> */}
                                        <IconButton aria-label="share">
                                            <DeleteIcon onClick={() => setSaveData(i)} />
                                        </IconButton>
                                        <Dialog open={delOpen} maxWidth="sm" >
                                            <DialogTitle>Are you Sure Cancel This Order</DialogTitle>
                                            <Box position="absolute" top={0} right={0}>
                                                <IconButton>
                                                    {/* <Close /> */}
                                                </IconButton>
                                            </Box>
                                            <DialogActions>
                                                <Button onClick={handleCloseDelete} color="primary" variant="contained">
                                                    Cancel
                                                </Button>
                                                <Button onClick={() => handleDelete(data)} color="secondary" variant="contained">
                                                    Confirm
                                                </Button>
                                            </DialogActions>
                                        </Dialog>

                                        <Toaster />
                                    </CardActions>

                                </Card>
                            </Grid>

                            {/* <UpdateProduct modalShow={modalShow} setModalShow={setModalShow} /> */}
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Update</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To subscribe to this website, please enter your email address here. We
                                        will send updates occasionally.
                                    </DialogContentText>
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
                                                    value={title}
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
                                                    value={description}
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
                                                    value={quantity}
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
                                                    type="number"
                                                    value={price}
                                                    onChange={e => setPrice(e.target.value)}

                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                {
                                                    !img && (
                                                        <img src={img} width="400px" />
                                                    )
                                                }
                                                <TextField
                                                    required
                                                    type='file'
                                                    onChange={onChange}
                                                // value={img}
                                                />
                                                {
                                                    img && (
                                                        <img src={img} width="400px" />
                                                    )
                                                }
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={() => handleUpdateData(i.id)} >Submit</Button>
                                </DialogActions>
                            </Dialog>
                        </>


                    )
                })}

            </Grid>
        </div >
    )
}
