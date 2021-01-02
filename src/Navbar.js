import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import './Navbar.css';
import sizes from './styles/sizes';

const styles = {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh',
        backgroundColor: 'white'
    },
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black'
        },
        [sizes.down('xs')]: {
            display: 'none'
        }
    },
    slider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
        [sizes.down('md')]: {
            width: '150px'
        }
    }
}

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            format: 'hex',
            open: false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(e) {
        this.setState({
            format: e.target.value,
            open: true
        });
        this.props.handleChange(e.target.value);
    }
    closeSnackbar() {
        this.setState({
            open: false
        });
    }
    render() { 
        const { level, changeLevel, handleChange, showingAllColors, classes } = this.props;
        const { format } = this.state;
        return ( 
           <header className={classes.Navbar}>
               <div className={classes.logo}>
                   <Link to='/'>reactcolorpicker</Link>
               </div>
               {showingAllColors && (
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider 
                                defaultValue={level} 
                                min={100} 
                                max={900} 
                                step={100} 
                                onAfterChange={changeLevel}/>
                        </div>
                    </div>
               )}
               <div className='select-container'>
                    <Select value={this.state.format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 0)</MenuItem>
                    </Select>
               </div>
               <Snackbar 
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id='message-id'>Format Changed To {format.toUpperCase()}</span>}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton 
                            onClick={this.closeSnackbar} 
                            color='inherit' 
                            key='close' 
                            aria-label='close'>
                            
                            <CloseIcon />
                        </IconButton>
                    ]}
               />
           </header> 
        );
    }
}

 
export default withStyles(styles)(Navbar);