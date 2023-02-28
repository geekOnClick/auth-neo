import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import './assets/lib/bootstrap/css/bootstrap-reboot.css';
import './assets/lib/bootstrap/css/bootstrap.css';
import './assets/styles/style.scss';

function App() {
    return (
        <div className='App wrapper h-100'>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
