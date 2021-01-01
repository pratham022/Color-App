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


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  navBtns: {
    marginRight: '1rem'
  },
  button: {
    margin: '0 0.5rem',
  },
  link: {
    textDecoration: 'none'
  }

});

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