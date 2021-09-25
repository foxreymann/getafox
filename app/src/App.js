import React from 'react';
import { Provider } from "mobx-react";
import 'mobx-react/batchingForReactDom'
import stores from "./stores";
import './App.css';
import { Container } from 'react-bootstrap';

import TokensList from './components/TokensList'
import OwnerTools from './components/OwnerTools'


function App() {
  return (
    <Provider {...stores}>
      <div className="App container">
        <header className="App-header my-3">
          <div className="row justify-content-center">
            <h1 className="col-auto">
              Get
            </h1>
            <h1 className="col-auto">
              A
            </h1>
            <h1 className="col-auto">
              Fox
            </h1>
          </div>
        </header>
        <OwnerTools />
        <div className="App-box">
          <h2>Your Foxes</h2>
          <TokensList listType='tokens' />
        </div>
        <div className="App-box">
          <h2>Foxes For Sale</h2>
          <TokensList listType='tokensForSale' />
        </div>
        <footer>
          &copy; {(new Date().getFullYear())}
        </footer>
      </div>
    </Provider>
  );
}

export default App;
