import React from 'react';

import './Modal.css';

const Modal = ({show, children, close}) => {
    const showHideClassName = show ? 'modal block' : 'modal none';

    return (
        <div className={showHideClassName}>
            <div className='modal-main'>
                <span className='close' onClick={close}>&#10005;</span>
                {children}
            </div>
        </div>
    )
}

export default Modal;