import React, { createContext } from 'react';
import { videos, categories } from '../data/videos';

export const DataContext = createContext({ videos, categories });

// PUBLIC_INTERFACE
export function DataProvider({ children }) {
  /** Provides static dataset of videos and categories */
  return <DataContext.Provider value={{ videos, categories }}>{children}</DataContext.Provider>;
}
