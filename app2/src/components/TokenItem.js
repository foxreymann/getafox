import React, { useState } from 'react';
import Web3 from "web3";
import Fox from './Fox'
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { Button, Modal } from 'react-bootstrap';

const TokenItem = ({ token }) => {
  const [modalShow, setModalShow] = React.useState(false);
  token = token.token


  return (
    <>
      <Button variant="light" onClick={() => setModalShow(true)}>
        <Fox genes={token.genes} />
        <div className="btn btn-info">Sell</div>
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

export default inject("web3Store")(observer(TokenItem));

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
