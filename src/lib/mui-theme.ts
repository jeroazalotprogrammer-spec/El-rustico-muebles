import { createTheme } from '@mui/material/styles';

export const rusticoTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#65462e',
      light: '#9a7349',
      dark: '#463124',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6b7c4c',
      dark: '#434d2e',
      contrastText: '#ffffff',
    },
    background: {
      default: '#faf7f2',
      paper: '#ffffff',
    },
    text: {
      primary: '#463124',
      secondary: '#7d5a38',
    },
  },
  typography: {
    fontFamily: '"Source Sans 3", system-ui, sans-serif',
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #e6d9c4',
          boxShadow: '0 1px 3px rgba(70, 49, 36, 0.08)',
        },
      },
    },
  },
});
