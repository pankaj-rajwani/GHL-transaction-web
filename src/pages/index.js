import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Transactions from './Transactions';

const routesDefinition = [
  { path: '/', component: <Route path='/' element={<Home />} /> },
  {
    path: '/transactions',
    component: <Route path='/transactions' element={<Transactions />} />,
  },
];

const Router = () => {
  const routes = routesDefinition;
  return <Routes>{routes.map((r, i) => ({ ...r.component, key: i }))}</Routes>;
};

export default Router;
