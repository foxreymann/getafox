import React from 'react';
import ColorMixer from 'ryb-color-mixer';

import "./Fox.css";

const Fox = ({ outer, inner }) => {
  const ears = '#' + ColorMixer.mix(outer, inner)

  return (
    <div className="fox-wrapper">
      <div className="fox">
        <div className="head" style={{ background: inner }}>
          <div className="eye"></div>
          <div className="eye"></div>
        </div>
        <div className="ear" style={{ background: ears }}></div>
        <div className="ear" style={{ background: ears }}></div>
        <div className="nose"></div>
        <div className="body" style={{ background: outer }}></div>
        <div className="tail" style={{ background: outer }}></div>
      </div>
    </div>
  )
};

export default Fox;
