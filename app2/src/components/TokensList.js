import React from "react";
import WithLoader from "./WithLoader";
import TokenItem from './TokenItem'
import { inject, observer } from "mobx-react";
import { Container, Row, Col } from 'react-bootstrap';

const TokensList = ({ web3Store: { tokens, tokensLoading, tokensForSale, tokensForSaleLoading }, listType }) => {

  if (listType === 'tokensForSale') {
    tokens = tokensForSale
    tokensLoading = tokensForSaleLoading
  }

  return (
    <Container>
      <WithLoader isLoading={tokensLoading}>
        {tokens && tokens.length ? (
          <Row>
            {tokens.map(token => (
              <Col key={token.tokenId} xl={3} lg={4} md={6} sm={6} xs={12} >
                <TokenItem
                  token={{token}}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="TokensList-label_empty">You don't have tokens yet.</div>
        )}
      </WithLoader>
    </Container>
  );
};

export default inject("web3Store")(observer(TokensList));
