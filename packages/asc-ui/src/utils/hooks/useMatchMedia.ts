import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { Theme } from '../../types'

const getBreakpoints = (theme: Theme.ThemeInterface) =>
  Object.keys(theme.breakpoints).reduce(
    (acc, key) => ({
      ...acc,
      [key]: theme.breakpoints[key]('min-width'),
      [`${key}Max`]: theme.breakpoints[key]('max-width'),
    }),

    {},
  )

export type Arguments = {
  query?: string
  minBreakpoint?: keyof Theme.BreakpointsInterface
  maxBreakpoint?: keyof Theme.BreakpointsInterface
}

export const WARNING_MESSAGES = {
  noProps: 'You must pass a query, minBreakpoint, or maxBreakpoint',
  bothQueryAndOther:
    'You are using both the query from and a minBreakpoint or a maxBreakpoint. The query prop will be ignored.',
}

const useMatchMedia = ({ minBreakpoint, maxBreakpoint, query }: Arguments) => {
  let mediaQuery = query
  const theme = useContext(ThemeContext)
  const breakpoints = getBreakpoints(theme)
  if (minBreakpoint && maxBreakpoint) {
    mediaQuery = `${breakpoints[minBreakpoint]} and ${
      breakpoints[`${maxBreakpoint}Max`]
    }`
  } else if (minBreakpoint || maxBreakpoint) {
    mediaQuery = breakpoints[minBreakpoint || `${maxBreakpoint}Max`]
  }

  const [isMatch, setIsMatch] = useState(
    mediaQuery ? window.matchMedia(mediaQuery).matches : false,
  )

  const handleMediaQueryListEvent = ({
    matches,
  }: MediaQueryListEvent | MediaQueryList) => setIsMatch(matches)

  if (query && (minBreakpoint || maxBreakpoint)) {
    // eslint-disable-next-line no-console
    console.warn(WARNING_MESSAGES.bothQueryAndOther)
  }

  useEffect(() => {
    let matchMedia: undefined | MediaQueryList
    if (mediaQuery) {
      matchMedia = window.matchMedia(mediaQuery)
      handleMediaQueryListEvent(matchMedia)

      // addEventListener might throw an error on iOS / Safari
      if (matchMedia.addEventListener) {
        matchMedia.addEventListener('change', handleMediaQueryListEvent)
      } else {
        matchMedia.addListener(handleMediaQueryListEvent)
      }
    } else {
      // eslint-disable-next-line no-console
      console.warn(WARNING_MESSAGES.noProps)
    }
    return () => {
      if (matchMedia) {
        // removeEventListener might throw an error on iOS / Safari
        if (matchMedia.removeEventListener) {
          matchMedia.removeEventListener('change', handleMediaQueryListEvent)
        } else {
          matchMedia.removeListener(handleMediaQueryListEvent)
        }
      }
    }
  }, [])

  return [isMatch]
}

export default useMatchMedia
