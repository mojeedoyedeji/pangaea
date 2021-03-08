import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


import { gql, useQuery, useMutation } from '@apollo/client';
import {setCart} from '../../actions/cart';
import {fixCurrency} from '../../actions/index';
import getSymbolFromCurrency from 'currency-symbol-map';


const GET_CURRENCY = gql`
  query {
    __type(name:"Currency"){
    name
    enumValues{
      name
    }
  }
}
`

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



const mainStyles = {
    card:{
        marginTop:10
    }
}
export default function Main(){
    const dispatch = useDispatch();
    const {data}  = useQuery(GET_CURRENCY);
    const [currency, setCurrency] = useState(useSelector(state=> state.main.currency));
    const products = useSelector(state => state.products.products);
    const cart = useSelector(state => state.cart.cart);
    var currencies=[];

    if(data){
        currencies = data.__type.enumValues;
    }

    useEffect(() => {
        updateCart();
    }, [products]); 

    function updateCart(){
        var lists = cart;
        var cartItems = cart;
        for(var j = 0; j < lists.length; j++){
           var product = lists[j]; 
           cartItems = cartItems.filter(item => item.id !== product.id);
           console.log(cartItems.length)
           var element = products.find(item => item.id === product.id);
           var newProduct = {...element, quantity:product.quantity, total: element.price*product.quantity}
           cartItems = [...cartItems, newProduct];
        }
        dispatch(setCart(cartItems))
    }

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
        dispatch(fixCurrency(event.target.value));
    }

    return(
        <div style={{padding:10}}>
          <Grid container direction="row">
          <TextField id="select" style={{width:"30%"}} 
           onChange={handleCurrencyChange}
              label="Currency" value={currency} select>
                {currencies.map((item) => (
                     <MenuItem value={item.name}> {item.name} </MenuItem>
                ))}
                </TextField>
          </Grid>
          <div style={{marginTop:20}}>
              {cart.length === 0 &&
                  <Grid container direction="row">
                   <Typography>
                  No items in this cart
                  </Typography>
                  </Grid>
                 }
              {cart.map((item) => (
                   <Item data={item} />
              ))}
         </div>
          <Summary />
        </div>
    )
}


function Item(props){
    const cart = useSelector(state => state.cart.cart);
    const currency = useSelector(state => state.main.currency);
    const dispatch = useDispatch()
    const classes = mainStyles;

    function removeItem(product){
        var cartItems = cart.filter(item => item.id != product.id)
        dispatch(setCart(cartItems))
    }

    function incrementItem(product){
        var element =  cart.map(item => 
            item.id === product.id
            ? {...item, quantity : item.quantity+1, 
                total: (item.quantity+1)*item.price} 
            : item)
        dispatch(setCart(element))
    }

    function decrementItem(product){
        var element =  cart.map(item => 
            item.id === product.id
            ? {...item, quantity : Math.max(item.quantity-1,1),
                total: Math.max(item.quantity-1, 1)*item.price} 
            : item)
        dispatch(setCart(element))
    }

    return(
            <Card style={classes.card}>
                <CardContent>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item md={10}>
                            <Typography>{props.data.title} </Typography>
                        </Grid>
                        <Grid item md={1}>
                            <IconButton onClick={() => removeItem(props.data)}><CloseIcon /></IconButton>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} direction="row" justify="space-between">
                        <Grid item md={4}>
                            <Grid spacing={1} container direction="row" alignItems="center">
                                <Grid item>
                                    <IconButton onClick={() => incrementItem(props.data)}> <AddIcon/></IconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1"> {props.data.quantity}</Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => decrementItem(props.data)}> <RemoveIcon/></IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={1}>
                        <Typography variant="h6"> {getSymbolFromCurrency(currency)}{props.data.total} </Typography>
                        </Grid>
                        <Grid item md={3}>
                            <Avatar src={props.data.image_url} variant="square" />
                        </Grid>
                        
                    </Grid>
                </CardContent>
            </Card>
    )
}

function Summary(){
    const cart = useSelector(state => state.cart.cart);
    const currency = useSelector(state => state.main.currency);

     const  getTotal = () => {
     var total = 0;
     for(var j = 0; j< cart.length; j++){
         total = total + Number(cart[j].total)
     }
     return total
    }
    return(
        <div style={{marginTop:100}}>
            <Divider />

            <div style={{marginTop:20}}>
            <Typography variant="h6"> Sub total: {getSymbolFromCurrency(currency)} {getTotal()}</Typography>
            </div>

            <div style={{marginTop:40}}>
            <Button color="primary" style={{width:'100%'}} variant="contained">
                <Typography variant="h6" style={{textTransform:"none"}}> 
                    Proceed to Checkout
                </Typography>
            </Button>
            </div>
        </div>
    )
}