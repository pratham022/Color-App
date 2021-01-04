import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { arrayMove } from 'react-sortable-hoc';

import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';



class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  state = {
    open: true,
    colors: seedColors[0].colors,
  };



  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = (newColor) => {
      this.setState({
          colors: [...this.state.colors, newColor],
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

  handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;
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
      <div className={classes.root} style={{background: 'white'}}>
        <PaletteFormNav 
          open={open} 
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
          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
            <div className={classes.buttons}>
              <Button 
                variant='contained' 
                color='secondary' 
                className={classes.button}
                onClick={this.clearColors}>CLEAR PALETTE</Button>
              <Button 
                variant='contained' 
                color='primary' 
                className={classes.button}
                onClick={this.addRandomColor}>RANDOM COLOR</Button>
            </div>
            <ColorPickerForm 
              paletteIsFull={paletteIsFull} 
              addNewColor={this.addNewColor}
              colors={colors}/>
          </div>
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
            axis='xy' 
            distance={20}/>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);