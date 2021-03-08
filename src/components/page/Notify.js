import React from 'react';
import {useDispatch} from 'react-redux';


import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux";
import {alertStyles} from "../../styles/alerts";



import {clearNotify} from "../../actions";


export default function Main(){
  const [open, setOpen] = React.useState(true);

  const dispatch = useDispatch();
  const notify = useSelector(state => state.main.notify);
  const styles = alertStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    dispatch(clearNotify())
  };
      return(
        <Snackbar open={notify.message}  autoHideDuration={6000}  onClose={handleClose}>  
           <Alert onClose={handleClose} severity={notify.status}>
           {notify.message}
          </Alert>
        </Snackbar>
      )

}
