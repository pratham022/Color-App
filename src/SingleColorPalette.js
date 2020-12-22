import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {  }
    }
    gatherShades(palette, colorToFilterBy) {
        // returns all shades of given color
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1);
    }
    render() { 
        const colorBoxes = this._shades.map(color => {
            console.log('Iterated');
            <ColorBox 
                key={color.id} 
                name={color.name} 
                color={color.hex}/>
        });
        console.log(this._shades);
        return ( 
            <div className='SingleColorPalette'>
                <h1>Single Color Palette</h1>
                {colorBoxes}
            </div>
        );
    }
}
 
export default SingleColorPalette;