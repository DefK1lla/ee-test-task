import { FC, PropsWithChildren, createContext, useState } from 'react'

type mode = 'light' | 'dark'

export const ThemeContext = createContext<
  [mode, (newValue: mode) => void]
>(['light', () => {}])

export const ThemeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [mode, setMode] = useState<mode>('light')

  return (
    <ThemeContext.Provider value={[mode, setMode]}>
      {children}
    </ThemeContext.Provider>
  )
}
