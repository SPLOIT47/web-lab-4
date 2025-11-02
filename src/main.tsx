import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './app'

import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

