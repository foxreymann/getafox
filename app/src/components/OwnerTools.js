import React from "react";
import { inject, observer } from "mobx-react";
import { Button } from 'react-bootstrap';

const OwnerTools = ({web3Store: { mint, cancelAll, web3User, owner }}) => {
  if(web3User && owner && web3User === owner) {
    return (
      <>
        <Button onClick={mint}>Mint</Button>
        <Button onClick={cancelAll}>Cancell All</Button>
      </>
    )
  }
}

export default inject("web3Store")(observer(OwnerTools));
