import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import BackgroundRemover from './pages/BackgroundRemover';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="background-remover" element={<BackgroundRemover />} />
            </Route>
        </Routes>
    );
};

export default App;
