import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { resultKeyNameFromField } from '@apollo/client/utilities';

import { gql, useQuery } from '@apollo/client';

import {fetchProduct} from '../../actions/product';
import {setCart} from '../../actions/cart';
import getSymbolFromCurrency from 'currency-symbol-map';

const useStyles = makeStyles({
    card: {
      height:280,
      background: "#F8F6FB",
      position: 'relative'
    },
    media: {
      height:240,
      width:120
    },
    img:{
      display: 'block',
      maxWidth:'100%',
      maxHeight:120,
      width: 'auto',
      height: 'auto'
    }
  });

const GET_PRODUCTS = gql`
  query Products($currency: Currency){
    products{
    id
    title
    image_url
    price(currency: $currency)
  }
}
`




export default function Main(){
  const currency = useSelector(state => state.main.currency);
  const {data}  = useQuery(GET_PRODUCTS, {variables:{currency}});
  const products = useSelector(state => state.products.products);
  const cart = useSelector(state => state.cart.cart);

  
  const dispatch = useDispatch();


  if(data){
    dispatch(fetchProduct(data.products))
    //updateCart()
  }

  function updateCart(){
    for(var j = 0; j < cart.length; j++){
       var product = cart[j];
       let element = products.find(item => item.id === product.id);
       var cartItems = cart.filter(item => item.id != product.id);
       product = {...product, price:element.price, total: element.price*product.quantity}
       cartItems = [...cartItems, product];
       dispatch(setCart(cartItems))
    }
   }



    return(
        <div>
            <Grid container direction="row" spacing={2}>
                {products.map((item) => (
                    <Grid item md={4} sm={6} xs={12}>
                      <Item data={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}


function Item(props){
        const classes = useStyles();
        const dispatch = useDispatch();
        const cart = useSelector(state => state.cart.cart);
        const currency = useSelector(state => state.main.currency);

        function addToCart(product){
          let element = cart.find(item => item.id === product.id);
          if(element){
            var cartItems = cart.filter(item => item.id != element.id)
            var cartItem = {...element, 
              quantity: element.quantity + 1, 
              total: (element.quantity+1)*element.price}
            cartItems.push(cartItem);
            dispatch(setCart(cartItems))
          }else{
            var cartItem = {...product, quantity:1, total: product.price}
            var cartItems = [...cart, cartItem];
            console.log(cartItems)
            dispatch(setCart(cartItems))
          }
          //const data = cart.map(item => item.id = product.id);
        }


        
        return (
          <Card elevation={0}  className={classes.card}>
             
              
              <CardContent >
            
              <Grid container direction="row" justify="center" style={{marginTop:10}}>
              <Grid item md={4}>
              <img className={classes.img} src={props.data.image_url} />
              </Grid>
              </Grid>

              
              <Typography style={{marginTop:10}} align="center" gutterBottom variant="h5" component="h2">
                  {props.data.title}
              </Typography>
              <Typography style={{marginTop:10}} align="center" variant="body2" color="textSecondary" component="p">
                    From {getSymbolFromCurrency(currency)} {props.data.price}
              </Typography>

             
             
              </CardContent>

              <CardActions style={{position:'absolute', bottom:0, width:'100%'}}>
              <Grid container direction="row" justify="center">
              <Button onClick={() => addToCart(props.data)} variant="contained" color="primary">
               <Typography variant="h6" style={{textTransform:"none"}}>
                  Add to Cart 
                </Typography>
              </Button>
              </Grid>
              </CardActions>
              

           

          
          </Card>
    )
}