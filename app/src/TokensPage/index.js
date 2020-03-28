import React from "react";
import Button from "components/Button";
import PropTypes from "prop-types";
import WithLoader from "components/WithLoader";
import TokensList from "./TokensList";
import { inject, observer } from "mobx-react";
import "./TokensPage.css";

const TokensPage = ({ tokenStore: { mintToken, isLoading, owner, user } }) => {
  return (
    <div className="TokensPage">
      <div>current user: {user}, owner: {owner}</div>
      <h1>Crypto Zorros</h1>
      { owner === user && <Button onClick={mintToken} label="Mint token" /> }
      <div className="TokensPage-tokens">
        <WithLoader isLoading={isLoading}>
          <TokensList />
        </WithLoader>
      </div>
    </div>
  );
};

TokensPage.propTypes = {
  tokenStore: PropTypes.shape({
    mintToken: PropTypes.func
  }).isRequired
};

export default inject("tokenStore")(observer(TokensPage));
