import React from "react";
import Web3 from "web3";
import Fox from './Fox'
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

const TokenItem = ({ token }) => {
  token = token.token

  return (
    <Fox genes={token.genes} />
  )
}

export default inject("web3Store")(observer(TokenItem));
