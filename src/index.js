import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GHLSnackbar } from '@components';
import Router from './pages';
import './index.css';

const App = () => {
  return (
    <>
      <GHLSnackbar>
        <Router />
      </GHLSnackbar>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default App;
