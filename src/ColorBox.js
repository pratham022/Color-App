import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

import './ColorBox.css';
import styles from './styles/ColorBoxStyles';



class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({
            copied: true
        }, () => { setTimeout(() => this.setState({ copied: false }), 1500)
        });
    }
    render() { 
        const {name, background, paletteId, id, showLink, classes} = this.props;
        const {copied} = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.5;
        return ( 
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background: background}} className='ColorBox'>
                    <div style={{background: background}} className={`copy-overlay ${copied && 'show'}`} />   {/* This div will grow and will take the entire screen when copied! */}
                    <div className={`copy-msg ${copied && 'show'}`}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={`copy-button ${classes.copyText}`}>Copy</button>
                    </div>
                    {showLink && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={`${classes.seeMore}`}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}
 
export default withStyles(styles)(ColorBox);