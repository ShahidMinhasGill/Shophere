import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function TotalEarning() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState([])
    const getProduct = async (id) => {
        const response = await axios.get(
            'http://localhost:8000/cart/');
        setProduct(response.data);

    };
    const goBack = () => {
        navigate('/admindashboard');
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

                        </ul>
                        <>
                            <ul className="cart_item">
                                <li className="cart_price_col">
                                    {product.reduce((total, item) => total + (item.price * item.quantity), 0)}
                                </li>
                                <li className="cart_price_col">
                                    {product.reduce((total, item) => total + (item.quantity * item.quantity), 0)}
                                </li>
                            </ul>


                            <Toaster />
                        </>

                    </div>
                </div>
            </div>

        </>
    )
}
