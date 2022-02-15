import React from 'react'
import "./Modal.css"
function Modal({ title, content, onConfirm }) {
    return (
        <>
            <div className='backdrop' onClick={onConfirm}></div>
            <div className='modal'>
                <header className='header'>
                    <h2>{title}</h2>
                </header>
                <div className='modalContent'>
                    <p>{content}</p>
                </div>
                <footer className='actions'>
                    <button onClick={onConfirm}>Okay</button>
                </footer>
            </div>
        </>
    )
}

export default Modal