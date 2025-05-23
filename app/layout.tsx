"use client";

import "./styles/index.css";
import { store } from "@/app/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function RootLayout({
                                     children,
                                   }: ILayout) {
  return (
    <html lang="en">
    <body
      className={`antialiased`}
    >
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <div className="flex flex-col grow">{children}</div>

        <div id="modal-root" />
      </ThemeProvider>
    </Provider>
    </body>
    </html>
  );
}
