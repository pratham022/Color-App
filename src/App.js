import React, { Component } from 'react';

import Palette from './Palette';

import seedColors from './seedColors';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <Palette {...seedColors[4]}/>
      </div>
    );
  }
}
 
export default App;

// seedColors will be an array of objects. Each object will represent a palette
