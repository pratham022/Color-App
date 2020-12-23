import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { 
            format: 'hex'
        }
        this.changeFormat = this.changeFormat.bind(this);
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
    changeFormat(val) {
        this.setState(st => ({
            format: val
        }))
    }
    render() { 
        const {format} = this.state;
        const {paletteName, emoji} = this.props.palette;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.name} 
                name={color.name} 
                background={color[format]}
                showLink={false}
            />
        ));
        console.log(this._shades);
        return ( 
            <div>
                <Navbar 
                    handleChange={this.changeFormat} 
                    showingAllColors={false}/>
                <div className='Palette'>
                    <div className='Palette-colors'>{colorBoxes}</div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}
 
export default SingleColorPalette;