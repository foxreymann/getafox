import React from 'react';
import { Provider } from "mobx-react";
import 'mobx-react/batchingForReactDom'
import stores from "./stores";
import './App.css';

import TokensList from './components/TokensList'
import OwnerTools from './components/OwnerTools'

function App() {
  return (
    <Provider {...stores}>
      <div className="App">
        <header className="App-header my-3">
          <h1>Get A Fox</h1>
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
          &copy; {(new Date().getFullYear())} <a target="_blank" href='https://www.ldnfox.com'>Fox Reymann LTD</a> in collaboration with <a target="_blank" href='https://extropy.io/'>Extropy.io</a>
        </footer>
      </div>
    </Provider>
  );
}

export default App;
