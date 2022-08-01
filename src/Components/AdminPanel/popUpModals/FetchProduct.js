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
export default function FetchProducts(url) {
    const [data, setData] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data');

                }
                return res.json();
            })
            .then(data => {
                setData(data);

                setLoading(false);
                setError(null);

            })
            .catch(err => {
                setError(err.message);
                setLoading(false)

            })
    }, [url]);
    return { data, loading, error }
    // return (
    //     <div>
    //         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    //             {product.map((i) => {
    //                 return (
    //                     <>
    //                         <Grid item xs={2} sm={4} md={4} key={i}>
    //                             <Card sx={{ maxWidth: 345 }}>
    //                                 <CardMedia
    //                                     component="img"
    //                                     height="194"
    //                                     image={i.img}
    //                                     alt="Paella dish"
    //                                 />
    //                                 <CardContent>
    //                                     <Typography variant="body2" color="text.secondary">
    //                                         {i.title}
    //                                     </Typography>
    //                                     <Typography variant="body2" color="text.secondary">
    //                                         {i.descrition}
    //                                     </Typography>
    //                                     <br></br>
    //                                     <Typography variant="body2" color="text.secondary">
    //                                         {i.price}
    //                                     </Typography>
    //                                 </CardContent>
    //                                 <CardActions disableSpacing>
    //                                     <IconButton aria-label="add to favorites">
    //                                         <EditIcon />
    //                                     </IconButton>
    //                                     <IconButton aria-label="share">
    //                                         <DeleteIcon />
    //                                     </IconButton>

    //                                 </CardActions>

    //                             </Card>
    //                         </Grid>
    //                     </>

    //                 )
    //             })}


    //         </Grid>
    //     </div >
    // )
}
