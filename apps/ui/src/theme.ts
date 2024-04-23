import { PaletteColorOptions, createTheme } from '@mui/material';
declare module '@mui/material/styles' {
  interface Palette {
    blackPearl: Palette['primary'];
    albescentWhite: Palette['primary'];
    acapulco: Palette['primary'];
    bismark: Palette['primary'];
    shadowGreen: Palette['primary'];
    catskillWhite: Palette['primary'];
    gray: Palette['primary'];
    lightGray: Palette['primary'];
    steelTeal: Palette['primary'];
  }
  interface PaletteOptions {
    blackPearl?: PaletteColorOptions;
    albescentWhite?: PaletteColorOptions;
    acapulco?: PaletteColorOptions;
    bismark?: PaletteColorOptions;
    shadowGreen?: PaletteColorOptions;
    catskillWhite?: PaletteColorOptions;
    gray?: PaletteColorOptions;
    lightGray?: PaletteColorOptions;
    steelTeal?: PaletteColorOptions;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#468189',
    },
    blackPearl: {
      main: '#031926',
    },
    albescentWhite: {
      main: '#F4E9CD',
    },
    acapulco: {
      main: '#77ACA2',
    },
    bismark: {
      main: '#468189',
    },
    shadowGreen: {
      main: '#9DBEBB',
    },
    catskillWhite: {
      main: '#ECF2F7',
    },
    gray: {
      main: '#F2F2F3',
    },
    lightGray: { main: '#B6B6B6' },
    steelTeal: { main: '#468189' },
  },
  typography: {
    fontFamily: ['Poppins', 'Inter'].join(','),
  },
});
