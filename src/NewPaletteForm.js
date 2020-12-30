import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

import DraggableColorBox from './DraggableColorBox';
import DraggableColorList from './DraggableColorList';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NewPaletteForm extends Component {
  state = {
    open: true,
    background: '#3434B8',
    newColorName: '',
    colors: [
        {color: 'blue', name: 'Blue'},
        {color: 'pink', name: 'Pink'},
    ],
    newPaletteName: ''
  };

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value => (
        this.state.colors.every(currColor => (
            currColor.name.toLowerCase() !== value.toLowerCase()
        ))
    ));

    ValidatorForm.addValidationRule('isColorUnique', value => (
        this.state.colors.every(currColor => (
            currColor.color !== this.state.background
        ))
    ));

    ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
      this.props.palettes.every(currPalette => (
          currPalette.paletteName.toLowerCase() !== value.toLowerCase()
      ))
  ));
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = () => {
      const newColor = {
            color: this.state.background,
            name: this.state.newColorName
        }
      this.setState({
          colors: [...this.state.colors, newColor],
          background: '#02021B',
          newColorName: ''
      })
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
    // this.setState({
    //     newColorName: evt.target.value
    // })
  }

  handleSubmit = () => {
    let newColorName = this.state.newPaletteName;
    const newPalette = {
      paletteName: newColorName,
      id: newColorName.toLowerCase().replace(/ /g, '-'),
      colors: this.state.colors,
    }
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  removeColor = (colorName) => {
      this.setState({
        colors: this.state.colors.filter(color => color.name !== colorName)
      });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

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
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator 
                  label='Palette Name' 
                  value={this.state.newPaletteName} 
                  name='newPaletteName' 
                  onChange={this.handleChange} 
                  validators={['required', 'isPaletteNameUnique']} 
                  errorMessages={['Enter Palette Name', 'Palette Name already used']}/>
              <Button
                variant='contained' 
                color='primary' 
                type='submit'>Save Palette</Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <Typography variant='h4'>Design Your Palette</Typography>
          <div>
            <Button variant='contained' color='secondary'>CLEAR PALETTE</Button>
            <Button variant='contained' color='primary'>RANDOM COLOR</Button>
          </div>
          <ChromePicker
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
                value={this.state.newColorName}
                name='newColorName'
                onChange={this.handleChange}
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={['This field is required', 'Color name must be unique', 'Color already used']}
            />
            <Button 
                variant='contained' 
                color='primary'
                style={{backgroundColor: this.state.background}}
                type='submit'>
                    ADD COLOR
            </Button>
          </ValidatorForm>

        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
            onSortEnd={this.onSortEnd}
            colors={this.state.colors} 
            removeColor={this.removeColor} 
            axis='xy'/>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);