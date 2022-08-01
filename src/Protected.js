import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    const navigate = useNavigate();
    let Cmp = props.Cmp
    useEffect(() => {
        if (!localStorage.getItem('userId')) {
            navigate('/');
        }

    }, [])
    return (
        <div>
            <Cmp />
        </div>
    )
}
