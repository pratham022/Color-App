import React, { Component } from 'react';

import Palette from './Palette';

import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    console.log(generatePalette(seedColors[2]));
    return ( 
      <div>
        <Palette {...seedColors[2]}/>
      </div>
    );
  }
}
 
export default App;

// seedColors will be an array of objects. Each object will represent a palette
