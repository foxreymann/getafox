import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { PropTypes as MobxPropTypes } from "mobx-react";
import { inject, observer } from "mobx-react";

import TokenItem from "./TokenItem";
import TokenView from "./TokenView";
import "./TokensList.css";

const TokensList = ({
  tokenStore: { tokens, user },
  modalStore: { showModal }
}) => {
  return (
    <Fragment>
      {tokens.length ? (
        <div className="TokensList">
          {tokens.map(token => (
            <TokenItem
              key={token.index}
              token={token.gradient}
              onClick={() => showModal(<TokenView
                gradient={token.gradient} user={user} owner={token.owner} tokenId={token.tokenId}/>
              )}
            />
          ))}
        </div>
      ) : (
        <div className="TokensList-label_empty">You don't have tokens yet.</div>
      )}
    </Fragment>
  );
};

TokensList.propTypes = {
  tokenStore: PropTypes.shape({
    tokens: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.object)
  }),
  modalStore: PropTypes.shape({
    showModal: PropTypes.func
  })
};

export default inject("tokenStore", "modalStore")(observer(TokensList));
