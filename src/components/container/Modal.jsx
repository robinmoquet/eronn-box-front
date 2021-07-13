import React from 'react';
import ModalReact from 'react-modal';
import Button from '../form/Button';

ModalReact.setAppElement('#root');

const Modal = ({ children, className, isOpen, close }) => {

    return (
        <div>
            <ModalReact
                isOpen={isOpen}
                onRequestClose={close}
                contentLabel="Modal"
                className="modal-content"
                overlayClassName="modal__overlay"
            >
                <div className={className ? `${className} modal` : 'modal'}>
                    <Button text={(<i className="material-icons">close</i>)} onClick={close} className="modal-close-btn" />
                    {children}
                </div>
            </ModalReact>
        </div>
    )
};

export default Modal;
