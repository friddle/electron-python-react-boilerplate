import React from 'react';
import { render } from 'react-dom';
import Hello from './components/Hello';
import HelloModel from './models/HelloModel';

const store = new HelloModel();


export default () => (
  <div>
    <Hello store={store} />
  </div>
    );

