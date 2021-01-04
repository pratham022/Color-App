import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newPaletteName: '',
            stage: 'form',
        }
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
            this.props.palettes.every(currPalette => (
                currPalette.paletteName.toLowerCase() !== value.toLowerCase()
            ))
        ));
    }
    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value
        });
    }
    showEmojiPicker() {
        this.setState({
            stage: 'emoji'
        })
    }
    savePalette(newEmoji) {
        
        const newPalette = {paletteName: this.state.newPaletteName, emoji: newEmoji.native};
        this.props.handleSubmit(newPalette);
        this.setState({
            stage: ''
        })
    }

    render() { 
        const { newPaletteName } = this.state;
        const {handleClose, open} = this.props;
        return ( 
            <div>
                <Dialog open={open && this.state.stage === 'emoji'} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
                    <Picker onSelect={this.savePalette} title='Pick a Palette Emoji'/>
                </Dialog>
                <Dialog open={open && this.state.stage === 'form'} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                PLease enter a name for your new beautiful palette. Make sure it's unique!
                            </DialogContentText>
                        
                            <TextValidator 
                                label='Palette Name' 
                                value={this.state.newPaletteName} 
                                name='newPaletteName' 
                                onChange={this.handleChange} 
                                fullWidth
                                margin='normal'
                                validators={['required', 'isPaletteNameUnique']} 
                                errorMessages={['Enter Palette Name', 'Palette Name already used']}/>
                        
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button
                                variant='contained' 
                                color='primary' 
                                type='submit'>
                                    Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}
 
export default PaletteMetaForm;