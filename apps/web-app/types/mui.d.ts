import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    background: {
      main: string;
    };
  }

  interface PaletteOptions {
    background: {
      main: string;
    };
  }
}
