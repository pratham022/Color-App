import React, { Component } from 'react';

import ColorBox from './ColorBox';
import Navbar from './Navbar';

import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level) {
        console.log(level);
        this.setState({
            level: level
        })
    }
    changeFormat(val) {
        this.setState(st => ({
            format: val
        }))
    }
    render() { 
        const colors = this.props.palette.colors;
        const level = this.state.level;
        const format = this.state.format;
        console.log(`Color format: ${format}`);
        const colorBoxes = colors[level].map(color => 
            (<ColorBox background={color[format]} name={color['name']} />)
        );
        return ( 
            <div className='Palette'>
                {/* Navbar goes here */}
                <Navbar 
                    level={level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeFormat}/>
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