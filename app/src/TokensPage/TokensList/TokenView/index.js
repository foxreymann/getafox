import React from "react";
import { PropTypes as MobxPropTypes } from "mobx-react";
import TokenImage from "components/TokenImage";
import Button from "components/Button";
import "./TokenView.css";

const TokenView = ({ gradient, user, owner }) => (
  <div>
    <div className="TokenView-image_wrapper">
      <TokenImage size={200} outer={gradient[0]} inner={gradient[1]} />
    </div>
    <div className="TokenView-label">{`${gradient[0]} – ${gradient[1]}`}</div>
    { owner === user && <Button onClick={console.log} label="Put on auction" /> }
  </div>
);

TokenView.propTypes = {
  token: MobxPropTypes.arrayOrObservableArray
};

export default TokenView;
