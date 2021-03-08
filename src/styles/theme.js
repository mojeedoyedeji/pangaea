import {createMuiTheme} from '@material-ui/core/styles';

import {colors} from './colors';

export const THEME = createMuiTheme({
   typography: {
    "fontFamily": "\"Sen\", sans-serif",
    "fontSize": 12,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
  },
  palette: {
   primary: {
     main:colors.primary
   },
 },
});
