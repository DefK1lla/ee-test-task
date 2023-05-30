import { useContext } from 'react'
import logo from './logo.svg'
import './styles/App.scss'

import ThemeSwitcher from './components/ThemeSwitcher'

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Container,
} from '@mui/material'
import { ThemeContext } from './context/theme'

function App() {
  const [mode] = useContext(ThemeContext)

  const theme = createTheme({
    palette: {
      mode,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar>
        <Container>
          <ThemeSwitcher />
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default App
