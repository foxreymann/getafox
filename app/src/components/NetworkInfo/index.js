import React from 'react';
import { inject, observer } from "mobx-react";

import "./NetworkInfo.css";

const NetworkInfo = ({ contractsStore: { networkType }}) => {
  console.log(networkType)

  return (
    <div id="network-info">network type: {networkType}</div>
  )
}

export default inject("contractsStore")(observer(NetworkInfo));
