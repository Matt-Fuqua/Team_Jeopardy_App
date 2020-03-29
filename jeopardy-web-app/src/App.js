import React from 'react';
import './App.css';
import { AppHeader } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { About, Admin, GamePlay, GameOver, GameSelection, Home } from './pages';
import { Content } from "carbon-components-react/lib/components/UIShell";
import Gameboard from './components/Gameboard';

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
            <Route path="/gameSelection">
              <GameSelection />
            </Route>
            <Route path="/gameOver">
              <GameOver />
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
