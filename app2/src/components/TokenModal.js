import React, { useState } from 'react';
import Web3 from "web3";
import Fox from './Fox'
import { inject, observer } from "mobx-react";
import { Button, Modal, Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';

const TokenModal = ({ show, onHide, token, web3Store: { web3User} }) => {
  const [modalShow, setModalShow] = React.useState(false);

  let priceInput = React.createRef();
  let unitEtherRadio = React.createRef();

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
        { token.owner === web3User &&
          <Container>
            <Row className='justify-content-md-center'>
              <Col xs lg={3}>
              </Col>
              <Col md='auto'>
                <FormControl ref={priceInput} placeholder="Type a price..." type="number" className="pull-right"/>
              </Col>
              <Col xs lg={3}>
                <Form.Check ref={unitEtherRadio} label='ether' type="radio" name="unit" defaultChecked />
                <Form.Check type="radio" label="Gwei" name="unit" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={onHide}>Put on auction</Button>
              </Col>
            </Row>
          </Container>
        }
      </Modal.Footer>
    </Modal>
  );
}

export default inject("web3Store")(observer(TokenModal));
