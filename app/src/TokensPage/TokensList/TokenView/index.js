import React from "react";
import { observer, inject, PropTypes as MobxPropTypes } from "mobx-react";
import TokenImage from "components/TokenImage";
import Button from "components/Button";
import Web3 from "web3";

import "./TokenView.css";

const TokenView = ({ gradient, user, owner, tokenId, price, tokenStore: { putOnAuction, buy }, modalStore: { hideModal } }) => {

  let priceInput = React.createRef();
  let unitEtherRadio = React.createRef();

  async function putOnActionClick() {
    if(!priceInput.current.value) {
      alert('Enter a value')
      return
    }
    await putOnAuction({ tokenId, price: priceInput.current.value, unit: unitEtherRadio.current.checked ? 'ether' : 'gwei' })
    hideModal()
  }

  return (
    <div>
      <div className="TokenView-image_wrapper">
        <TokenImage size={200} outer={gradient[0]} inner={gradient[1]} />
      </div>
      <div className="TokenView-label">{`${gradient[0]} – ${gradient[1]}`}</div>
      {price && <div className="TokenItem-label">price: {Web3.utils.fromWei(price)} ether</div>}
      { owner === user ?
        <span>
          <div>
            <input ref={priceInput} placeholder="Type an amout..." type="number" />
          </div>
          <div>
            <input ref={unitEtherRadio} type="radio" id="ether" name="unit" value="ether" defaultChecked />
            <label htmlFor="ether">ether</label>
          </div>
          <div>
            <input type="radio" id="gwei" name="unit" value="gwei" />
            <label htmlFor="gwei">Gwei</label>
          </div>
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
