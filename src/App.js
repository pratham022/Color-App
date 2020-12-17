import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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
    return ( 
      <Switch>
        <Route exact path='/' render={() => <h1>Palette list goes here...</h1>}/>
        <Route exact path='/palette/:id' render={() => <h1>Individual palette</h1>}/>
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[2])} />
      // </div>
    );
  }
}
 
export default App;

// seedColors will be an array of objects. Each object will represent a palette
