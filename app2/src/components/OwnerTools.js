import React from "react";
import { inject, observer } from "mobx-react";
import { Button } from 'react-bootstrap';

const OwnerTools = ({web3Store: { mint }}) => {
  return (
    <Button onClick={mint}>Mint</Button>
  )
}

export default inject("web3Store")(observer(OwnerTools));
