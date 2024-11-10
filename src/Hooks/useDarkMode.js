import React, { useEffect, useState } from 'react'

// Custom hook to manage dark mode
function useDarkMode() {
  // Initialize theme state with the value stored in localStorage
  const [theme, setTheme] = useState(localStorage.theme)
  // Determine the opposite theme based on the current theme
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  // Effect to update the theme in the document and localStorage
  useEffect(() => {
    // Get the root element of the document
    const root = window.document.documentElement
    // Remove the opposite theme class from the root element
    root.classList.remove(colorTheme)
    // Add the current theme class to the root element
    root.classList.add(theme)
    // Update the theme in localStorage
    localStorage.setItem('theme', theme)
  }, [theme, colorTheme]) // Dependencies: theme and colorTheme

  // Return the opposite theme and the function to set the theme
  return [colorTheme, setTheme]
}

export default useDarkMode