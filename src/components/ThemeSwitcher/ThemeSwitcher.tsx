import { Switch, Typography } from '@mui/material'

import s from './themeSwithcer.module.scss'
import { useContext } from 'react'
import { ThemeContext } from '../../context/theme'

const ThemeSwitcher = () => {
  const [mode, setMode] = useContext(ThemeContext)

  return (
    <div className={s.wrapper}>
      <Typography>Light</Typography>
      <Switch
        onChange={e =>
          e.target.checked ? setMode('dark') : setMode('light')
        }
      />
      <Typography>Dark</Typography>
    </div>
  )
}

export default ThemeSwitcher
