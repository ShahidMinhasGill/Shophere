import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    const getId = localStorage.getItem('userId');
    const navigate = useNavigate();
    let Cmp = props.Cmp
    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            navigate('/');
        } else if (getId != 1) {
            navigate('/');
        } else
            navigate('/admindashboard');

    }, [])
    return (
        <div>
            <Cmp />
        </div>
    )
}
