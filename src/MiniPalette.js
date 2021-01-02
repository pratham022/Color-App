import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';



function MiniPalette(props) {
    const {classes, paletteName, emoji, colors} = props;
    const miniColorBoxes = colors.map(color => (
        <div className={classes.miniColor} 
            style={{background: color.color}} 
            key={color.name}>

        </div>
    ));
    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.delete}>
                <DeleteIcon className={classes.deleteIcon}/>
            </div>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);








// const styles = {
//     main: {
//         backgroundColor: 'purple',
//         border: '3px solid teal',
//         '& h1': {
//             color: 'white',
//         }
//     }, 
//     secondary: {
//         backgroundColor: 'pink',
//     }
// };

// return (
//     <div className={classes.main}>
//         <h1>Mini Palette</h1>
//         <h1 className={classes.secondary} >Secondary</h1>
//     </div>
// )