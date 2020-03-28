import React from "react";
import { observer, inject, PropTypes as MobxPropTypes } from "mobx-react";
import TokenImage from "components/TokenImage";
import Button from "components/Button";
import "./TokenView.css";

const TokenView = ({ gradient, user, owner, tokenId, tokenStore: { putOnAuction } }) => (
  <div>
    <div className="TokenView-image_wrapper">
      <TokenImage size={200} outer={gradient[0]} inner={gradient[1]} />
    </div>
    <div className="TokenView-label">{`${gradient[0]} – ${gradient[1]}`}</div>
    { owner === user && <Button onClick={() => putOnAuction({ tokenId, price: 100 })} label="Put on auction" /> }
  </div>
);

TokenView.propTypes = {
  token: MobxPropTypes.arrayOrObservableArray
};

export default inject("tokenStore")(observer(TokenView));
