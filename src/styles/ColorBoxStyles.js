import chroma from 'chroma-js';

export default {
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0, 0, 0, 0.5)' : 'white',
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? 'white' : 'rgba(0, 0, 0, 0.5)',
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.5 ? 'rgba(0, 0, 0, 0.5)' : 'white',
        background: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        border: 'none',
        right: '0px',
        bottom: '0px',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        textTransform: 'uppercase',
    },
}