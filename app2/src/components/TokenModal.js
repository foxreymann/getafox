import React, { useState } from 'react';
import Web3 from "web3";
import Fox from './Fox'
import { inject, observer } from "mobx-react";
import { Button, Modal } from 'react-bootstrap';

const TokenModal = ({ show, onHide, token }) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="text-center"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100" id="contained-modal-title-vcenter">
          Fox #{token.tokenId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Fox genes={token.genes} className="w-100" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default inject("web3Store")(observer(TokenModal));
