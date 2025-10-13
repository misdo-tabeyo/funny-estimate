import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: "'Noto Sans JP',sans-serif",
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 700,
      fontWeightBold: 900,
      h1: {
        fontSize: 38,
        fontWeight: 900,
        fontStyle: 'italic'
      },
      h2: {
        fontSize: 36,
        fontWeight: 900,
        fontStyle: 'italic',
        lineHeight: 1.3
      },
      h3: {
        fontSize: 20,
        fontWeight: 700
      },
      h4: {
        fontSize: 22,
        fontWeight: 900
      },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
      subtitle1: { fontSize: 18 },
      body1: { fontSize: 16 },
      button: {
        textTransform: "none",
        fontSize: 18,
        fontWeight: 700
      },
    },
    palette: {
      text: {
        primary: "#000",
      },
      primary: {
        main: '#EAC645',
      },
      background: {
        default: '#FFF7DB',
        paper: '#FFFFFF',
      },
    },
});

export default theme;
