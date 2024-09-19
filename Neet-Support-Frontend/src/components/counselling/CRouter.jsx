import React from 'react';
import Message from './Message'; // Global Component
import FillDetails from './FillDetails';
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter from here

const CRouter = () => {
  return (
    <>
      {/* Keep Message global (renders on every route) */}
      <Message />

      {/* Define your routes here */}
      <Routes>
        <Route path="/fill-details" element={<FillDetails />} />
        {/* Add other routes if needed */}
      </Routes>
    </>
  );
}

export default CRouter;
