import React from "react";
import WithLoader from "./WithLoader";
import { inject, observer } from "mobx-react";
import stores  from '../stores'

const TokensList = ({ web3Store: { tokens, tokensLoading }, listType }) => {
  const isLoading = tokensLoading

  return (
    <WithLoader isLoading={isLoading}>
      <div>tokens go here</div>
    </WithLoader>
  );
};

export default inject("web3Store")(observer(TokensList));
