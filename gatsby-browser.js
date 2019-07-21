/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react';
import { Provider as PrismProvider } from './src/components/Prism';

export const wrapRootElement = ({ element }) => (
  <PrismProvider>{element}</PrismProvider>
)
