import React from 'react';
import './App.css';
import { AppHeader } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { About, Admin, Dashboard, GamePlay, Home } from './pages';
import { Content } from "carbon-components-react/lib/components/UIShell";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Content>
        <Router>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/gamePlay">
              <GamePlay />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Content>
    </div>
  );
}

export default App;
