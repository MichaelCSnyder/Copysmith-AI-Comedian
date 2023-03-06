import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Archived from './Pages/Archived';
import Generate from './Pages/Generate';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Generate />} />
                <Route path="/archived" element={<Archived />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
