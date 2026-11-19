import { createContext, useContext } from 'react'

// The three styles of the design system (design-system branch). The app never sets one, so it is always 'tamago' and
// every component draws exactly as before. Storybook's Style switch sets 'ios' or 'android' and hands over the
// platform parts (src/components/platform), which a component uses in place of its own drawing when one exists.
export const STYLES = ['tamago', 'ios', 'android']
const StyleContext = createContext({ style: 'tamago', parts: null })

export function StyleProvider({ style = 'tamago', parts = null, children }) {
  return <StyleContext.Provider value={{ style, parts }}>{children}</StyleContext.Provider>
}
export const useStyle = () => useContext(StyleContext).style
// The platform's own version of a component, or null: always null in the Tamago style.
export function usePlatformPart(name) {
  const { style, parts } = useContext(StyleContext)
  return style === 'tamago' ? null : parts?.[name] ?? null
}
