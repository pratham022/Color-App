import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import './App.css';


class App extends Component {
  findPalette(id) {
    return seedColors.find(function(pal) {
      return pal.id === id
    });
  }
  render() { 
    return ( 
      <Switch>
        <Route exact path='/palette/new' render={() => <NewPaletteForm />} />
        <Route exact path='/' render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps}/>}/>
        <Route exact path='/palette/:id' 
          render={routeProps => (
              <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />)} />
        <Route path='/palette/:paletteId/:colorId'
          render={routeProps => (
            <SingleColorPalette 
                palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} 
                colorId={routeProps.match.params.colorId}/>)}
        />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[2])} />
      // </div>
    );
  }
}
 
export default App;

// seedColors will be an array of objects. Each object will represent a palette
