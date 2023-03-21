import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

export function VerticalModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
          {props.message}
        
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-recovery--modal text-white' onClick={props.onHide}><Link className='text-decoration-none text-white' to={props.to}>{props.buttonName}</Link></button>
      </Modal.Footer>
    </Modal>
  );
}