import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

function Confirm(props){

    return (
        <Modal
        show={true}
        onHide={props.onCloseConfirm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure to remove {props.sizeSet} task{props.sizeSet>1 ? "s": ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button 
        onClick={props.onConfirmDelete}
        variant='danger'
        >
        Delete
        </Button>
        <Button onClick={props.onCloseConfirm}>Cancel</Button>
      </Modal.Footer>
    </Modal>
    )
}

Confirm.propTypes = {
  onCloseConfirm: PropTypes.func.isRequired,
  sizeSet: PropTypes.number.isRequired,
  onConfirmDelete: PropTypes.func.isRequired
}


export default Confirm;