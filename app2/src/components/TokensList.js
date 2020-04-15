import React from "react";
import WithLoader from "./WithLoader";
import TokenItem from './TokenItem'
import { inject, observer } from "mobx-react";
import { Container, Row, Col } from 'react-bootstrap';

const TokensList = ({ web3Store: { tokens, tokensLoading }, listType }) => {

  return (
    <Container>
      <WithLoader isLoading={tokensLoading}>
        {tokens && tokens.length ? (
          <Row>
            {tokens.map(token => (
              <Col xl={3} lg={4} md={6} sm={6} xs={12} >
                <TokenItem
                  key={token.tokenId}
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
