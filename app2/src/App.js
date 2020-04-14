import React from 'react';
import { Provider } from "mobx-react";
import stores from "./stores";
import './App.css';

import TokensList from './components/TokensList'

function App() {
  return (
    <Provider {...stores}>
      <div className="App">
        <header className="App-header">
          <h1>Get A Fox</h1>
        </header>
        <TokensList listType='tokens' />
      </div>
    </Provider>
  );
}

export default App;
