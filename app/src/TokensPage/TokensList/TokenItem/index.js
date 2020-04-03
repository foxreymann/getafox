import React from "react";
import PropTypes from "prop-types";
import { PropTypes as MobxPropTypes } from "mobx-react";
import Web3 from "web3";

import TokenImage from "components/TokenImage";
import "./TokenItem.css";

const TokenItem = ({ token, onClick, price }) => {
  return (
    <div className="TokenItem" onClick={onClick}>
      <div className="TokenItem-image_wrapper">
        <TokenImage outer={token[0]} inner={token[1]} />
      </div>
      <div className="TokenItem-label">{`${token[0]} – ${token[1]}`}</div>
      {price && <div className="TokenItem-label">price: {Web3.utils.fromWei(price)} ether</div>}
    </div>
  );
};

TokenItem.propTypes = {
  token: MobxPropTypes.arrayOrObservableArray,
  onClick: PropTypes.func
};

export default TokenItem;
