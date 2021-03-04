import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { MainForm, MainList } from './pages/Main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/funcionario/new" component={MainForm} />
        <Route path="/funcionario/edit/:id" component={MainForm} />
        <Route path="/MainForm" component={MainForm} />
        <Route path="/" component={MainList} />
      </Switch>
    </BrowserRouter>
  );
}
