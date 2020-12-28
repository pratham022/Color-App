export default {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    colors: {
        height: '82%',
    },
    goBack: {
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',             /* width: 100px, so give margin of half the width ie. 50px in the left  */             
        marginTop: '-15px',              /* height: 30px, so give margin of half the height ie. 15px in the top */
        textAlign: 'center',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        color: 'white',
        textTransform: 'uppercase',
        border: 'none',
        textDecoration: 'none',
    }
}