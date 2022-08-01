import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddProduct from './popUpModals/AddProduct';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Products from './popUpModals/FetchProduct';
import FetchProducts from './popUpModals/FetchProduct';
import DisplayProduct from './popUpModals/DisplayProduct';
import { Link as LinkRouterDom, Route, Routes, useParams } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {

    const [open, setOpen] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(false);
    const { data: product, loading, error } = FetchProducts('http://localhost:8000/products');
    console.log('dashboard Product', product);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    // React.useEffect(() => {
    //     FetchProducts();
    // }, [upadateProduct])
    return (
        <>

            <ThemeProvider theme={mdTheme}>

                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >

                        </Toolbar>

                        <Divider />
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Dashboard</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                name="category-list"
                                id="category-list"
                            >

                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Orders</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <LinkRouterDom to='/order/details'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ShoppingCartIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Order List" />
                                    </ListItemButton>
                                </LinkRouterDom>
                                <LinkRouterDom to='/total/earining'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ShoppingCartIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Total Earning" />
                                    </ListItemButton>
                                </LinkRouterDom>



                            </AccordionDetails>
                        </Accordion>
                    </Drawer>

                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >

                        <LinkRouterDom to='/create-product'>
                            <Button style={{ background: '#2E3B55' }}
                                type="submit"
                                size="large"
                                variant="contained"
                                sx={{ mt: 3 }}

                            >
                                Add Products
                            </Button>
                        </LinkRouterDom>

                        <Toolbar />

                        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>

                                    {/* <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}> */}
                                    {/* {loading &&
                                        <Typography variant="body2" color="text.secondary">
                                            Loding....
                                        </Typography>
                                    }
                                    {error &&
                                        <Typography variant="body2" color="text.secondary">
                                            {error}
                                        </Typography>
                                    } */}
                                    <DisplayProduct />
                                    {/* </Paper> */}


                                </Grid>

                            </Grid>

                            <Copyright sx={{ pt: 4 }} />
                        </Container>

                    </Box>

                </Box>
            </ThemeProvider>
        </>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
