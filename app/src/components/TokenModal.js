import React from 'react';
import Fox from './Fox'
import Price from './Price'
import { inject, observer } from "mobx-react";
import { Button, Modal, Container, Row, Col, FormControl, Form } from 'react-bootstrap';

const TokenModal = ({ show, onHide, token, web3Store: { web3User, putOnAuction, auctionInstance, buy } }) => {
  let priceInput = React.createRef();

  async function putOnAuctionClick() {
    if(!priceInput.current.value) {
      alert('Enter a price')
      return
    }
    await putOnAuction({ tokenId: token.tokenId, price: priceInput.current.value, unit: 'ether' })
    onHide()
  }

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
            <Row className='justify-content-md-center price-input'>
              <FormControl ref={priceInput} placeholder="Type a price..." type="number"/>
              <h5 className="text-lg-left">TT</h5>
            </Row>
            <Row>
              <Col>
                <Button variant='info' onClick={putOnAuctionClick}>Put on auction</Button>
              </Col>
            </Row>
          </Container>
        }

        { token.owner === auctionInstance.address &&
          <Container>
            <Row>
              <Col>
                <Price price={token.price} />
                <Button variant='info' onClick={async () => {
                  await buy({tokenId: token.tokenId})
                  onHide()
                }}>Buy</Button>
              </Col>
            </Row>
          </Container>
        }
      </Modal.Footer>
    </Modal>
  );
}

export default inject("web3Store")(observer(TokenModal));
