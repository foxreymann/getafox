import React, { useState } from 'react';
import Web3 from "web3";
import Fox from './Fox'
import TokenModal from './TokenModal'
import { inject, observer } from "mobx-react";
import { Button } from 'react-bootstrap';

const TokenItem = ({ token }) => {
  const [modalShow, setModalShow] = React.useState(false);
  token = token.token


  return (
    <>
      <Button variant="light" onClick={() => setModalShow(true)}>
        <Fox genes={token.genes} />
        <div className="btn btn-info">Sell</div>
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
