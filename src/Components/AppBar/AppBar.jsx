import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { withTheme } from 'styled-components';
import logo from '../../Asets/logo.png';
import ForgetPassword from '../popUpModal/ForgetPasword';
import { Link as LinkRouterDom, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChangePassword from '../popUpModal/ChangePassword';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { create } from 'ipfs-http-client';
import toast, { Toaster } from 'react-hot-toast';
const client = create('https://ipfs.infura.io:5001/api/v0');
const ResponsiveAppBar = () => {
    const getId = localStorage.getItem('userId');
    const [isLoggedIn, setisLoggedIn] = React.useState(false);

    const [data, setData] = React.useState([]);
    const [user, setUser] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [userProfile, setUserProfile] = React.useState('');
    const [img, setImg] = React.useState('');
    const [pic1, setpic1] = React.useState(false)
    const [file, setFile] = React.useState(``)
    const [name, setName] = React.useState(``)
    const [email, setEmail] = React.useState(``)
    const [address, setAddress] = React.useState(``)
    const [mobileNumber, setMobileNumber] = React.useState(``)
    const [password, setPassword] = React.useState(``)
    const [modalShow, setModalShow] = React.useState(false);

    const navigate = useNavigate();
    const getProduct = async () => {
        const response = await axios.get(
            'http://localhost:8000/cart/');
        setData(response.data)
    }
    const getUser = async () => {
        const response = await axios.get(
            'http://localhost:8000/users/' + getId)
        setUserProfile(response.data.img);
        setUser(response.data);


    }

    const handleClickOpen = () => {
        setOpen(true);
        console.log('get id', getId);
        setOpen(true);
        const getUserOnclick = async () => {
            const response = await axios.get(
                'http://localhost:8000/users/' + getId);
            setName(response.data.fullName);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setMobileNumber(response.data.phoneNo);
            setImg(response.data.img);
            setPassword(response.data.password);
        }
        getUserOnclick();
    };
    const handleUpdate = () => {
        const upadateData = async () => {
            try {
                const added = await client.add(file);
                const picUrl = `https://ipfs.infura.io/ipfs/${added.path}`
                setImg(picUrl);
                if (pic1 === true) {
                    const response = await axios.put(' http://localhost:8000/users/' + getId, {
                        "fullName": name,
                        "email": email,
                        "address": address,
                        "password": password,
                        "phoneNo": mobileNumber,
                        "img": picUrl,
                    });
                } else {
                    // let fffPic = img;
                    const response = await axios.put(' http://localhost:8000/users/' + getId, {
                        "fullName": name,
                        "email": email,
                        "address": address,
                        "password": password,
                        "phoneNo": mobileNumber,
                        "img": img,
                    });
                }
            } catch (error) {
                console.log('data not update', error);
            }
            toast.success(`Profile Update successfully!`)

            setOpen(false);
            getUser();
        }
        upadateData();
    };

    const logOut = () => {
        localStorage.removeItem('userId');
        setisLoggedIn(false);
        setUserProfile('');
        setData('');
        navigate('/')

    };
    const handleClose = () => {
        setOpen(false);
    };
    const length = data.length;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    function onChange(e) {
        setpic1(true)
        setFile(e.target.files[0])
        setImg(URL.createObjectURL(e.target.files[0]));
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 5,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',

        },
    }));
    React.useEffect(() => {
        getUser();
        getProduct();

    }, []);
    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <>

                <Toaster />
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        </Typography>


                        <Typography>
                            <img src={logo} height='80px' sx={{ mt: 4 }} alt="" />
                        </Typography>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        </Box>
                        {(getId != 1 && getId != null) &&
                            <Box sx={{ mx: 2, flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton aria-label="cart">
                                        <LinkRouterDom to='/cart-product'>
                                            <StyledBadge badgeContent={length} color="secondary">
                                                <ShoppingCartIcon style={{ color: 'white' }} />
                                            </StyledBadge>
                                        </LinkRouterDom>

                                    </IconButton>

                                </Tooltip>

                            </Box>
                        }
                        {getId == null &&
                            <LinkRouterDom to='/login'>
                                <Button >Login</Button>
                            </LinkRouterDom>
                        }
                        <Box sx={{ mx: 4, flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={userProfile} />
                                </IconButton>
                            </Tooltip>
                            {getId && (
                                <>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >


                                        <MenuItem >
                                            <Typography onClick={() => handleClickOpen()} textAlign="center">Edit Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => setModalShow(true)}>
                                            <Typography textAlign="center">Change Password</Typography>
                                        </MenuItem>


                                        <MenuItem onClick={logOut}>
                                            <Typography textAlign="center">Log Out</Typography>
                                        </MenuItem>

                                        <ChangePassword modalShow={modalShow} setModalShow={setModalShow} />


                                    </Menu>
                                </>
                            )}
                        </Box>

                    </Toolbar>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To Upadte to this Profile
                            </DialogContentText>

                            <Grid container spacing={2} >
                                <Grid item xs={12}  >
                                    <TextField
                                        autoComplete="given-name"
                                        name="Full Name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        // defaultValue={user1.name}
                                        autoFocus
                                        value={name}
                                        onChange={e => setName(e.target.value)}

                                    />
                                </Grid>
                            </Grid>

                            <Grid className='mt-3' container spacing={2} >
                                <Grid item xs={12}  >
                                    <TextField
                                        autoComplete="given-name"
                                        name="email"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        // defaultValue={user1.name}
                                        autoFocus
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}

                                    />
                                </Grid>
                            </Grid>
                            <Grid className='mt-3' container spacing={2} >
                                <Grid item xs={12}  >
                                    <TextField
                                        autoComplete="given-name"
                                        name="address"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        // defaultValue={user1.name}
                                        autoFocus
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}

                                    />
                                </Grid>
                            </Grid>
                            <Grid className='mt-3' container spacing={2} >
                                <Grid item xs={12}  >
                                    <TextField
                                        autoComplete="given-name"
                                        name="phoneNo"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone No"
                                        // defaultValue={user1.name}
                                        autoFocus
                                        value={mobileNumber}
                                        onChange={e => setMobileNumber(e.target.value)}

                                    />
                                </Grid>
                            </Grid>
                            <Grid className='mt-3' item xs={12}>
                                {
                                    !userProfile && (
                                        <img src={img} width="200px" />
                                    )
                                }
                                <TextField
                                    required
                                    type='file'
                                    onChange={onChange}
                                // value={img}
                                />
                                {
                                    userProfile && (
                                        <img src={img} width="200px" />
                                    )
                                }
                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleUpdate}>Update</Button>
                        </DialogActions>
                    </Dialog>
                </Container>

            </>
        </AppBar >
    );
};
export default ResponsiveAppBar;
