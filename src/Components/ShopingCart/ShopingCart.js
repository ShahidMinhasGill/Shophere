import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './ShopingCart.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function ShopingCart() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState([])
    const [data, setData] = useState([]);
    const setSaveData = (i) => {
        setData(i.id);
        setOpen(true);
    }
    const getProduct = async (id) => {
        const response = await axios.get(
            'http://localhost:8000/cart/');
        setProduct(response.data);

    };
    const goBack = () => {
        navigate('/');
    }
    const handleRemove = async (data) => {
        setOpen(true);
        const response = await axios.delete(
            'http://localhost:8000/cart/' + data);
        setOpen(false);
        getProduct();
        toast.success(`Product Deleted Succesfully`)

    };
    const close = () => {
        setOpen(false);
    }
    useEffect(() => {
        getProduct();
    }, []);
    return (
        <>
            <Toaster />

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

                            <li className="cart_head_title">
                                My Cart
                            </li>
                            <li className="cart_head_product">
                                Product
                            </li>
                            <li className="cart_head_options">
                                Quantity
                            </li>
                            <li className="cart_head_price">
                                Price
                            </li>
                        </ul>
                        {product.map((i) => {
                            return (
                                <>
                                    <ul className="cart_item">

                                        <li className="cart_img_col">
                                            <img src={i.img} />
                                        </li>

                                        <li className="cart_product_col">
                                            <p>{i.title}</p>
                                        </li>

                                        <li className="cart_options_col">
                                            <input type="number" min="1" value={i.quantity} />
                                        </li>

                                        <li className="cart_price_col">
                                            <h2>{i.price}</h2>
                                        </li>
                                        <li className="cart_del_col"
                                            onClick={() => setSaveData(i)}
                                        >
                                            <img src="https://i.imgur.com/bI4oD5C.png" />
                                        </li>
                                    </ul>
                                    <Dialog open={open} maxWidth="sm" >
                                        <DialogTitle>Are you Sure Cancel This Order</DialogTitle>
                                        <Box position="absolute" top={0} right={0}>
                                            <IconButton>
                                                {/* <Close /> */}
                                            </IconButton>

                                        </Box>
                                        <DialogActions>
                                            <Button onClick={close} color="primary" variant="contained">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => handleRemove(data)} color="secondary" variant="contained">
                                                Confirm
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </>
                            )
                        })}

                    </div>
                </div>
            </div>

        </>
    )
}
