import React from "react";
import { observer, inject, PropTypes as MobxPropTypes } from "mobx-react";
import TokenImage from "components/TokenImage";
import Button from "components/Button";
import "./TokenView.css";

const TokenView = ({ gradient, user, owner, tokenId, price, tokenStore: { putOnAuction, buy }, modalStore: { hideModal } }) => (
  <div>
    <div className="TokenView-image_wrapper">
      <TokenImage size={200} outer={gradient[0]} inner={gradient[1]} />
    </div>
    <div className="TokenView-label">{`${gradient[0]} – ${gradient[1]}`}</div>
    {price && <div className="TokenItem-label">price: {price}</div>}
    { owner === user ?
      <Button onClick={async () => {
        await putOnAuction({ tokenId, price: 999999999999999})
        hideModal()
      }} label="Put on auction" /> :
      <Button onClick={() => buy({ tokenId, price })} label="Buy" />
    }
  </div>
);

TokenView.propTypes = {
  token: MobxPropTypes.arrayOrObservableArray
};

export default inject("tokenStore", "modalStore" )(observer(TokenView));
