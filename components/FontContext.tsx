import React, { createContext, useState, useEffect } from 'react';
import * as Font from 'expo-font';

// Create a context for fonts
export const FontContext = createContext(false)

export const FontProvider = ({children}: {children: any}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'HarryP': require('@/assets/fonts/HarryP.ttf'),
      });
      setFontsLoaded(true)
    };

    loadFonts()
  }, [])

  return (
    <FontContext.Provider value={fontsLoaded}>
      {fontsLoaded ? children : null}
    </FontContext.Provider>
  )
}
