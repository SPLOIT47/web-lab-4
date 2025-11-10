import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from "./i18n";
import {AppShell} from "@/components/layout/AppShell";
import {UnitsProvider} from "@/context/UnitsContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <I18nProvider>
            <UnitsProvider>
                <ThemeProvider>
                    <AppShell />
                </ThemeProvider>
            </UnitsProvider>
        </I18nProvider>
    </React.StrictMode>
);

