import { useContext } from 'react'
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
import CountriesDataGrid from './components/CountriesDataGrid'

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
      <div className='pageWrapper'>
        <Container>
          <CountriesDataGrid />
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
