"use client";

import "./styles/index.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {ILayout} from '@/app/code/response';

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
            <ThemeProvider theme={darkTheme}>
                <div className="flex flex-col grow">{children}</div>

                <div id="modal-root" />
            </ThemeProvider>
        </body>
        </html>
    );
}
