import { makeStyles } from '@material-ui/core/styles';

export const globalStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width:'100%',
      minHeight:'110vh',
      position:"relative", top: 0, bottom: 0, left: 0, right: 0,
      background: "#F8F6FB",
      paddingBottom:40
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    buttonText:{
      fontFamily: "Sen",
      textTransform: "none"
    },
    header:{
      fontFamily: "Poppins",
      textTransform: "none"
    },
    subheader:{
      fontFamily:"Poppins",
      textTransform:"none",
      fontSize:25,
    },
    avatarLarge:{
      width: 100,
      height: 100,
      marginBottom: -50,
      borderWidth:5,
      borderColor:"#2B2D42",
    }
}));
