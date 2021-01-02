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
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function(pal) {
      return pal.id === id
    });
  }
  savePalette(newPalette) {
    console.log('Entered upper save palette method');
    console.log(newPalette);
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    }, this.syncLocalStorage);

  }
  syncLocalStorage() {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }
  render() { 
    return ( 
      <Switch>
        <Route exact path='/palette/new' render={(routeProps) => 
                                                  <NewPaletteForm 
                                                      savePalette={this.savePalette} 
                                                      palettes={this.state.palettes}
                                                      {...routeProps}/>} 
                                                      />

        <Route exact path='/' render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps}/>}/>
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
