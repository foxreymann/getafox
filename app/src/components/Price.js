import React from 'react';
import Web3 from "web3";
import { inject, observer } from "mobx-react";
import { Alert, Badge } from 'react-bootstrap';

const Price = ({ price }) => {
  price = Web3.utils.fromWei(price)

  return (
    <Alert variant='primary'>
      Price: { price } ETH
      { price <= 0.01 && <Badge className="ml-1" variant="warning">Bargain</Badge> }
    </Alert>
  )
}

export default inject("web3Store")(observer(Price));
