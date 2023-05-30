import { GridEventLookup } from '@mui/x-data-grid'
import { GridApiCommunity } from '@mui/x-data-grid/internals'
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react'

const EVENTS: string[] = [
  'sortModelChange',
  'filterModelChange',
  'columnVisibilityModelChange',
  'paginationModelChange',
]

export const useGirdPersist = (
  apiRef: MutableRefObject<GridApiCommunity>,
  key: string,
  events: string[] = EVENTS
): void => {
  const isInitialized = useRef(false)

  const saveState = useCallback(() => {
    const state = apiRef.current.exportState()
    localStorage.setItem(key, JSON.stringify(state))
  }, [apiRef, key])

  useEffect(() => {
    if (!apiRef?.current?.subscribeEvent) return

    if (!isInitialized.current) {
      const prevStateRaw = localStorage.getItem(key)

      if (prevStateRaw)
        apiRef.current.restoreState(JSON.parse(prevStateRaw))

      isInitialized.current = true
    }

    const subs = events.map(e =>
      apiRef.current.subscribeEvent(
        e as keyof GridEventLookup,
        saveState
      )
    )

    return () => {
      subs.map(unsub => unsub())
    }
  }, [apiRef, events, key, saveState])
}
