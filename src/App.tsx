import React, { FunctionComponent } from 'react';
import Navbar from './components/navbar/navbar';
import Axios from 'axios';
import LRU from 'lru-cache';
import { configure } from 'axios-hooks';

const axios = Axios.create({
  baseURL: 'http://localhost:8085/api',
});
const cache = new LRU({ max: 10 });

configure({ axios, cache });

const App: React.FC = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default App;
