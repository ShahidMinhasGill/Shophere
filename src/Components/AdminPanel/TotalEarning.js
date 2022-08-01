import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// import { Close } from '@material-ui/icons';
export default function TotalEarning() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState([])
    const getProduct = async (id) => {
        const response = await axios.get(
            'http://localhost:8000/cart/');
        setProduct(response.data);
        // calculatePrice(response.data);

    };
    // const calculatePrice = (data) => {
    //     console.log('price', data.price);
    // }
    const goBack = () => {
        navigate('/admindashboard');
    }
    const handleRemove = async (id) => {
        setOpen(true);
        const response = await axios.delete(
            'http://localhost:8000/cart/' + id);
        console.log(response.data);
        setOpen(false);
        toast.success(`Product Canceld Successfully`)
        getProduct();

    };
    const close = () => {
        setOpen(false);
    }
    useEffect(() => {
        getProduct();
    }, []);
    return (
        <>


            <div className='container'>
                <div class="back-button" onClick={() => goBack()}>
                    <div class="arrow-wrap">
                        <span class="arrow-part-1"></span>
                        <span class="arrow-part-2"></span>
                        <span class="arrow-part-3"></span>
                    </div>
                </div>
                <div className="page mt-5">
                    <div id="store_cart">
                        <ul className="cart_head">


                            <li className="cart_head_price">
                                Toatal Earnings
                            </li>
                            <li className="cart_head_price">
                                Toatal Products
                            </li>
                            {/* <li className="cart_head_price">
                                Toatal invice :
                            </li> */}
                        </ul>
                        {/* {product.map((i) => {
                            return ( */}
                        <>
                            <ul className="cart_item">



                                <li className="cart_price_col">
                                    {product.reduce((total, item) => total + (item.price * item.quantity), 0)}
                                </li>
                                <li className="cart_price_col">
                                    {product.reduce((total, item) => total + (item.quantity * item.quantity), 0)}
                                </li>
                                {/* <li className="cart_del_col"
                                            onClick={() => setOpen(true)}
                                        >
                                            <img src="https://i.imgur.com/bI4oD5C.png" />
                                        </li> */}
                            </ul>
                            {/* <Dialog open={open} maxWidth="sm" >
                                <DialogTitle>Are you Sure Cancel This Order</DialogTitle>
                                <Box position="absolute" top={0} right={0}>
                                    <IconButton>
                                    </IconButton>

                                </Box>
                             
                                <DialogActions>
                                    <Button onClick={close} color="primary" variant="contained">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => handleRemove(i.id)} color="secondary" variant="contained">
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog> */}

                            <Toaster />
                        </>
                        {/* )
                        })} */}
                    </div>
                </div>
            </div>

        </>
    )
}
