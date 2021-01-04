import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from "@material-ui/core/styles";

import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            background: '#3434B8',
            newColorName: '',
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => (
            this.props.colors.every(currColor => (
                currColor.name.toLowerCase() !== value.toLowerCase()
            ))
        ));
    
        ValidatorForm.addValidationRule('isColorUnique', value => (
            this.props.colors.every(currColor => (
                currColor.color !== this.state.background
            ))
        ));
    
      }
    
    handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
    };

    handleChange = (evt) => {
        this.setState({
        [evt.target.name]: evt.target.value
        });
        // this.setState({
        //     newColorName: evt.target.value
        // })
    }
    handleSubmit = () => {
        const newColor = {
            color: this.state.background,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({
            background: '#2626A8',
            newColorName: ''
        })
    }
    render() { 
        const { classes, paletteIsFull } = this.props;
        return ( 
            <div className={classes.pickerContainer}>
                <ChromePicker
                    color={ this.state.background }
                    onChangeComplete={ this.handleChangeComplete }
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                        value={this.state.newColorName}
                        name='newColorName'
                        variant="filled"
                        className={classes.colorNameInput}
                        margin='normal'
                        placeholder='Color Name'
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['This field is required', 'Color name must be unique', 'Color already used']}
                    />
                    <Button 
                        variant='contained' 
                        color='primary'
                        className={classes.addColor}
                        style={{backgroundColor: paletteIsFull ? '#808080' : this.state.background}}
                        disabled={paletteIsFull}
                        type='submit'>
                        {paletteIsFull ? 'Palette Full' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}
 
export default withStyles(styles)(ColorPickerForm);