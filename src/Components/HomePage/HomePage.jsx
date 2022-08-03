import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/system';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ResponsiveAppBar from '../AppBar/AppBar';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function HomePage() {
    const getId = localStorage.getItem('userId');
    const [product, setProduct] = React.useState([]);
    const [cartLength, setCartLength] = React.useState([]);
    const getProductOnclick = async () => {
        const response = await axios.get(
            'http://localhost:8000/products/');
        setProduct(response.data)
    }

    const handleAddToCart = (i) => {
        const addData = async () => {
            const res = await axios.post(' http://localhost:8000/cart/', {
                "title": i.title,
                "description": i.description,
                "category": i.category,
                "quantity": '1',
                "price": i.price,
                "img": i.img,

            });
            console.log(i);
            toast.success(`successfully added!`)
            const length = res.length;
            console.log('lelel', length);

        };
        addData();
        getCartItmes();

    }
    const getCartItmes = async () => {
        const response = await axios.get(
            'http://localhost:8000/cart/');
        setCartLength(response.data);
        console.log('cart lenth', response.data);
    }
    React.useEffect(() => {
        getProductOnclick();
        getCartItmes();
    }, []);
    return (
        <>
            <ResponsiveAppBar cartLength={cartLength} />

            <Container>
                <>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Toaster />

                            {product.map((i) => {
                                return (
                                    <>
                                        <Grid item xs={2} sm={4} md={4} key={i}>
                                            <Card sx={{ maxWidth: 345, mt: 3 }}>

                                                <CardMedia
                                                    component="img"
                                                    height="130"
                                                    image={i.img}
                                                    alt="Paella dish"
                                                />
                                                <CardContent>
                                                    <Typography sx={{ mt: 1 }} component="h1" variant="h5">
                                                        {i.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {i.description}
                                                    </Typography>
                                                    <Typography sx={{ mt: 2 }} component="h1" variant="h5">
                                                        {i.price}
                                                    </Typography>

                                                </CardContent>
                                                <CardActions >
                                                    {getId &&

                                                        <Button style={{ background: '#2E3B55' }}
                                                            type="submit"
                                                            fullWidth
                                                            variant="contained"
                                                            sx={{ mt: 0, mb: 2 }}

                                                            onClick={() => handleAddToCart(i)}
                                                        >
                                                            Add to Cart
                                                        </Button>
                                                    }

                                                </CardActions>


                                            </Card>

                                        </Grid>
                                    </>


                                )
                            })}
                        </Grid>
                    </Box>



                </>
            </Container >
        </>
    );
}
