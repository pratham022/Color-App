import React from 'react';

function PaletteFooter(props) {
    const {paletteName, emoji} = props;
    return (
        <div className='Palette-footer'>
            {paletteName}
            <span className='emoji'>{emoji}</span>
        </div>
    );
}

export default PaletteFooter;