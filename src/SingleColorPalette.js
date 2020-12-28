import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

const styles = {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    colors: {
        height: '82%',
    },
    goBack: {
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',             /* width: 100px, so give margin of half the width ie. 50px in the left  */             
        marginTop: '-15px',              /* height: 30px, so give margin of half the height ie. 15px in the top */
        textAlign: 'center',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        color: 'white',
        textTransform: 'uppercase',
        border: 'none',
        textDecoration: 'none',
    }
}

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
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
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
                <div className={`SingleColorPalette ${classes.Palette}`}>
                <Navbar 
                    handleChange={this.changeFormat} 
                    showingAllColors={false}/>
                    <div className={classes.colors}>
                        {colorBoxes}
                        <div className='go-back ColorBox'>
                            <Link to={`/palette/${id}`} className={classes.goBack}>Go Back</Link>
                        </div>
                    </div>
                    <PaletteFooter paletteName={paletteName} emoji={emoji}/>    
                </div>
                
            </div>
        );
    }
}
 
export default withStyles(styles)(SingleColorPalette);