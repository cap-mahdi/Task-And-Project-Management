import { createTheme, PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    blackPearl: Palette['primary'];
    albescentWhite: Palette['primary'];
    acapulco: Palette['primary'];
    bismark: Palette['primary'];
    shadowGreen: Palette['primary'];
    catskillWhite: Palette['primary'];
  }
  interface PaletteOptions {
    blackPearl?: PaletteColorOptions;
    albescentWhite?: PaletteColorOptions;
    acapulco?: PaletteColorOptions;
    bismark?: PaletteColorOptions;
    shadowGreen?: PaletteColorOptions;
    catskillWhite?: PaletteColorOptions;
  }
}

const theme = createTheme({
  palette: {
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
  },
});

export default theme;
