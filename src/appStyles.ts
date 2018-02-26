// Normally these styles would be housed in app.tsx with the component.
// however out of respect for the brief - i've separated them to here
export default {
    '@global': {
        body: {
            fontFamily: 'sans-serif',
            margin: 0,
        },
        '*': {
            boxSizing: 'border-box',
        },
    },
    rolloverPopup: {
        background: 'white',
        paddingTop: '40px',
        paddingBottom: '30px',
        paddingLeft: '5px',
        fontSize: '18px',
        lineHeight: '22px',
    },
    container: {
        boxShadow: '0px 0px 13px 0px #444444',
        display: 'inline-block',
        width: '522px',
        margin: '14px',
    },
}
