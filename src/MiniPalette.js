import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
            cursor: 'pointer',
        }
    },
    colors: {
        backgroundColor: 'gray',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        fontSize: '1rem',
        position: 'relative'
    },
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem',
    }
};

function MiniPalette(props) {
    const {classes, paletteName, emoji} = props;
    console.log(classes);
    return (
        <div className={classes.root}>
            <div className={classes.colors}>

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