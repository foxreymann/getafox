import React from 'react';
import ColorMixer from 'ryb-color-mixer';

import "./Fox.css";

const getOuterInnerFromGenes = genes => {
//  console.log(genes)

//  const outer = genes.slice(0,3)
// console.log(outer)

  return {
    outer: '#ff0000',
    inner: '#00ff00'
  }
}

const Fox = ({ genes }) => {

  const { outer, inner } = getOuterInnerFromGenes(genes)
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
