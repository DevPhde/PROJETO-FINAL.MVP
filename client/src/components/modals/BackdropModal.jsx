import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import "../../style/modal.css"

export function BackdropModal(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.message}
        </Modal.Body>
        <Modal.Footer>
          <button className='btn-recovery--modal' onClick={handleClose}>
          <Link className='text-decoration-none text-white' to={props.to}>{props.namebutton}</Link>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}