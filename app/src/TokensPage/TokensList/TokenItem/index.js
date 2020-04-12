import React from "react";
import PropTypes from "prop-types";
import { PropTypes as MobxPropTypes } from "mobx-react";
import Web3 from "web3";

import Fox from "components/Fox";

import "./TokenItem.css";

const TokenItem = ({ genes, onClick, price }) => {
  return (
    <div className="TokenItem" onClick={onClick}>
      <div className="TokenItem-image_wrapper">
        <Fox size={200} genes={genes} />
      </div>
      {price && <div className="TokenItem-label">price: {Web3.utils.fromWei(price)} ether</div>}
    </div>
  );
};

TokenItem.propTypes = {
  token: MobxPropTypes.arrayOrObservableArray,
  onClick: PropTypes.func
};

export default TokenItem;
