import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { rusticoTheme } from '../../lib/mui-theme';

interface Props {
  children: ReactNode;
}

export default function MuiProvider({ children }: Props) {
  return (
    <ThemeProvider theme={rusticoTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
