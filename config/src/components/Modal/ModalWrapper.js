import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const ModalWrapper = ({ title, content, footer, show, onHide, className }) => (
  <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-lg" className={className}>
    {title &&
      <Modal.Header closeButton>
        <h6 className="modal-title">{title}</h6>
      </Modal.Header>
    }
    <Modal.Body>
    {!title &&
      <button onClick={onHide} type="button" className="close" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    }
      {content}
    </Modal.Body>
    {footer &&
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    }
  </Modal>
);

ModalWrapper.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.object,
  footer: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default ModalWrapper;
