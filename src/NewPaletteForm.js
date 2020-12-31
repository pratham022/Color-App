import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';

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
  static defaultProps = {
    maxColors: 20
  }
  state = {
    open: true,
    background: '#3434B8',
    newColorName: '',
    colors: this.props.palettes[0].colors,
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
          background: '#2626A8',
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

  handleSubmit = (newPaletteName) => {
    let newColorName = newPaletteName;
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

  clearColors = () => {
    this.setState({
      colors: []
    })
  }
  addRandomColor = () => {
    const allColors = this.props.palettes.map(palette => palette.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({
      colors: [...this.state.colors, randomColor]
    })
  }

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;

    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav 
          open={open} 
          classes={classes} 
          palettes={palettes} 
          handleSubmit={this.handleSubmit} 
          handleDrawerOpen={this.handleDrawerOpen}/>
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
            <Button 
              variant='contained' 
              color='secondary' 
              onClick={this.clearColors}>CLEAR PALETTE</Button>
            <Button 
              variant='contained' 
              color='primary' 
              onClick={this.addRandomColor}>RANDOM COLOR</Button>
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
                style={{backgroundColor: paletteIsFull ? '#808080' : this.state.background}}
                disabled={paletteIsFull}
                type='submit'>
                  {paletteIsFull ? 'Palette Full' : 'Add Color'}
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