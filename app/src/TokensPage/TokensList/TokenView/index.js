import React from "react";
import { observer, inject, PropTypes as MobxPropTypes } from "mobx-react";
import TokenImage from "components/TokenImage";
import Button from "components/Button";
import "./TokenView.css";

const TokenView = ({ gradient, user, owner, tokenId, price, tokenStore: { putOnAuction, buy }, modalStore: { hideModal } }) => {

  let priceInput = React.createRef();

  async function putOnActionClick() {
    await putOnAuction({ tokenId, price: priceInput.current.value })
    hideModal()
  }

  return (
    <div>
      <div className="TokenView-image_wrapper">
        <TokenImage size={200} outer={gradient[0]} inner={gradient[1]} />
      </div>
      <div className="TokenView-label">{`${gradient[0]} – ${gradient[1]}`}</div>
      {price && <div className="TokenItem-label">price: {price}</div>}
      { owner === user ?
        <span>
          <input ref={priceInput} placeholder="Type an amout..." type="number" />
          <Button onClick={putOnActionClick} label="Put on auction" />
        </span> :
        <Button onClick={async () => {
          await buy({ tokenId })
          hideModal()
        }} label="Buy" />
      }
    </div>
  )
}

TokenView.propTypes = {
  token: MobxPropTypes.arrayOrObservableArray
};

export default inject("tokenStore", "modalStore" )(observer(TokenView));
