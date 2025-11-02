import { AppShell } from './components/layout/AppShell'
import { I18nProvider } from './i18n'

export default function App() {
  return (
    <I18nProvider>
      <AppShell />
    </I18nProvider>
  )
}
