import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { storage } from '@utils';
import Home from './Home';
import Transactions from './Transactions';

const openRoutes = [
  { path: '/', component: <Route path='/' element={<Home />} /> },
];

const protectedRoutes = [
  {
    path: '/transactions',
    component: <Route path='/transactions' element={<Transactions />} />,
  },
];

const Router = () => {
  const routes = storage.get('walletId')
    ? [...openRoutes, ...protectedRoutes]
    : openRoutes;
  return <Routes>{routes.map((r, i) => ({ ...r.component, key: i }))}</Routes>;
};

export default Router;
