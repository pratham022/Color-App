import React, { Component } from 'react';
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';



class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newPaletteName: '',
            formShowing: false,
        }
    }
    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value
        });
    }
    handleClickOpen = () => {
      this.setState({
          formShowing: true
      })
    }
    handleClose = () => {
      this.setState({
          formShowing: false
      })
  }
    render() { 
        const { classes, open, handleDrawerOpen, palettes, handleSubmit } = this.props;
        const { newPaletteName } = this.state;
        return ( 
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                position='fixed'
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}
                color='default'
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color='inherit'
                    aria-label='Open drawer'
                    onClick={handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit' noWrap>
                        Create a Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                  <Link to='/' className={classes.link}>
                          <Button variant='contained' color='secondary' className={classes.button}>Go Back</Button>
                  </Link>
                  <Button variant="contained" color="primary" onClick={this.handleClickOpen} className={classes.button}>
                    SAVE
                  </Button>
                </div>
                </AppBar>
                {this.state.formShowing && (
                  <PaletteMetaForm 
                  palettes={palettes} 
                  handleSubmit={handleSubmit}
                  handleClose={this.handleClose}
                  open={this.state.formShowing}
                  />
                )}
            </div>
        );
    }
}
 
export default withStyles(styles, { withTheme: true })(PaletteFormNav);