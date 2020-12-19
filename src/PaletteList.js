import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                    <p>
                        <Link to={`/palette/${palette.id}/`}>{palette.paletteName}</Link>
                    </p>
                ))}
            </div>
        );
    }
}
 
export default PaletteList;