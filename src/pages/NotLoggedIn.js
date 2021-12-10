import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useHistory} from 'react-router';

export default function MediaCard() {

    const history = useHistory();

    const LoginHandler = () => {
        history.push('/auth/login');
    }

  return (
    <Card sx={{ maxWidth: 800, maxHeight:800 }}>
      <CardMedia
        component="img"
        height="140"
        image="/mainImage.jpg"
        alt="bankImage"
        sx={{ maxWidth: 800, maxHeight:800 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          NAGP Bank
        </Typography>
        <Typography variant="body2" color="text.secondary">
            NAGP is a bank of great tech peoples who learn and teach other fellows to deposit great tech stacks in everyones saving.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" onClick={LoginHandler}>Login</Button>
      </CardActions>
    </Card>
  );
}