import { makeStyles } from '@material-ui/core/styles';

export const alertStyles = makeStyles({
    success: {
      backgroundColor: '#D8F0D1',
      borderRadius: 3,
      padding: 10,
    },
    warning:{
      backgroundColor:'#FFDCAD',
      borderRadius: 3,
      padding: 10,
    },
    error:{
      backgroundColor: "#FDD8DE",
      borderRadius: 3,
      padding: 10,
    },
    successText:{
      color: '#59B93C',
      fontFamily:"Roboto"
    },
    warningText:{
      color: '#E07F00',
      fontFamily:"Roboto"
    },
    errorText:{
      color: '#D50B2D',
      fontFamily:"Roboto"
    }
});
