import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import MiniPalette from './MiniPalette';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {palettes} = this.props;
        return ( 
            <div>
                <h1>REACT COLORS</h1>
                {palettes.map(palette => (
                    <MiniPalette {...palette} />
                ))}
            </div>
        );
    }
}
 
export default PaletteList;