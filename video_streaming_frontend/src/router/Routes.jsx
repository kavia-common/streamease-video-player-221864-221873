import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Watch from '../pages/Watch';
import Search from '../pages/Search';
import Category from '../pages/Category';

// PUBLIC_INTERFACE
export default function RoutesRoot() {
  /**
   * Defines application routes.
   * - / => Home
   * - /watch/:id => Watch page with player
   * - /search => Search page
   * - /category/:slug => Category listing
   */
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/search" element={<Search />} />
      <Route path="/category/:slug" element={<Category />} />
    </Routes>
  );
}
