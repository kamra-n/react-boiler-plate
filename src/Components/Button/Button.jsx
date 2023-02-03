import React from 'react'

export default function Button({ children, className, onClick, ...rest }) {
    return (
        <button className={className}  onClick={onClick} style={rest}>{children}</button>
    )
}

Button.defaultProps = {
    borderRadius: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    letterSpacing: '0.25px',
    fontSize: '14px',
    padding: '1rem 5rem',
    height: '40px',
    border: '1px solid black'

}