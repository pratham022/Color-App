import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import ColorBox from './ColorBox';

import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            level: 500
        }
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(level) {
        console.log(level);
        this.setState({
            level: level
        })
    }
    render() { 
        const colors = this.props.palette.colors;
        const level = this.state.level;
        const colorBoxes = colors[level].map(color => 
            (<ColorBox background={color.hex} name={color.name} />)
        );
        return ( 
            <div className='Palette'>
                <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={this.changeLevel}/>
                {/* Navbar goes here */}
                <div className='Palette-colors'>
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* footer eventually */}
            </div>
        );
    }
}
 
export default Palette;