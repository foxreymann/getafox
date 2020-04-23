import React from 'react';
import Fox from './Fox'
import TokenModal from './TokenModal'
import Price from './Price'
import { inject, observer } from "mobx-react";
import { Button } from 'react-bootstrap';

const TokenItem = ({ token, web3Store: { web3User, auctionInstance }  }) => {
  const [modalShow, setModalShow] = React.useState(false);
  token = token.token

  return (
    <>
      <Button variant="light" onClick={() => setModalShow(true)}>
        <Fox genes={token.genes} className="mb-3" />
        { web3User === token.owner && <div className="btn btn-info">Sell</div> }
        { token.owner === auctionInstance.address &&
          <>
          <Price price={token.price} />
          <div className="btn btn-info">Buy</div>
          </>
        }
      </Button>

      <TokenModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        token={token}
      />
    </>
  )
}

export default inject("web3Store")(observer(TokenItem));
