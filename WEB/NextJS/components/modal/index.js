import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function Index({ show, setShow, children }) {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton className='border-0'>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </>
    );
}

export default Index;