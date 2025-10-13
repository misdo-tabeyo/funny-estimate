import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: "'Noto Sans JP',sans-serif",
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 700,
      h1: { fontSize: 38 },
      h2: { fontSize: 36 },
      h3: { fontSize: 20 },
      h4: { fontSize: 18 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
      subtitle1: { fontSize: 18 },
      body1: { fontSize: 16 },
      button: {
        textTransform: "none",
        fontSize: 16
      },
    },
    palette: {
      text: {
        primary: "#000",
      },
      primary: {
        main: '#ffd500',
      },
    },
});

export default theme;
