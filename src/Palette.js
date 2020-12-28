import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

import './Palette.css';
import styles from './styles/PaletteStyles';

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
        const paletteName = this.props.palette.paletteName;
        const emoji = this.props.palette.emoji;
        const id = this.props.palette.id;
        const classes = this.props.classes;
        console.log(`Color format: ${format}`);
        const colorBoxes = colors[level].map(color => 
            (<ColorBox 
                background={color[format]} 
                name={color['name']} 
                key={color.id} 
                id={color.id}
                paletteId={id}
                showLink={true}
            />)
        );
        return ( 
            <div className={classes.Palette}>
                {/* Navbar goes here */}
                <Navbar 
                    level={level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeFormat} 
                    showingAllColors={true}/>
                <div className='Palette-colors'>
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* footer eventually */}
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}
 
export default withStyles(styles)(Palette);