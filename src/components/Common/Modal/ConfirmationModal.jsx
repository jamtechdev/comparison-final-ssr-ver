import React from "react";

import { Button, Modal } from "react-bootstrap";
import "./confimation.css";

function ConfirmationModal({ showModal, handleClose, handleConfirm }) {
  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className="confirm-modal-body">
          <p>
            None of the products meet your filtering criteria. Search between
            all product variants?
          </p>
          <div className="d-flex justify-content-center gap-3 align-items-center">
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ConfirmationModal;
