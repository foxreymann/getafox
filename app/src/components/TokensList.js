import React from "react";
import TokenItem from './TokenItem'
import { inject, observer } from "mobx-react";
import { Alert, Row, Col, Spinner } from 'react-bootstrap';

const TokensList = ({ web3Store: { tokens, tokensLoading, tokensForSale, tokensForSaleLoading }, listType }) => {

  if (listType === 'tokensForSale') {
    tokens = tokensForSale
    tokensLoading = tokensForSaleLoading
  }

  if (tokensLoading) {
    return (
      <Spinner animation="border" variant='warning'>
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  if (!tokensLoading && (!tokens || (tokens && tokens.length === 0))) {

    if (listType === 'tokens') {
      return (
        <>
          <Alert variant='info'>You don't have any Foxes yet.</Alert>
          <Alert variant='warning'>Why not get some!</Alert>
        </>
      )
    }

    if (listType === 'tokensForSale') {
      return (
        <>
          <Alert variant='info'>No Foxes on the market</Alert>
        </>
      )
    }
  }

  if (!tokensLoading && tokens && tokens.length) {
    return (
      <Row>
        {tokens.map(token => (
          <Col key={token.tokenId} xl={3} lg={4} md={6} sm={6} xs={12} className='mb-3 p-2' >
            <TokenItem
              token={{token}}
            />
          </Col>
        ))}
      </Row>
    )
  }
};

export default inject("web3Store")(observer(TokensList));
