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
                    {content.length > 1 &&
                        content.map((sentence, index) => {
                            return <div key={index}>{sentence}</div>
                        })}
                    {content && <div>{content}</div>}
                </div>
                <footer className='actions'>
                    <button onClick={onConfirm}>Okay</button>
                </footer>
            </div>
        </>
    )
}

export default Modal