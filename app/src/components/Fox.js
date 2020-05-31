import React from 'react';
import ColorMixer from 'ryb-color-mixer';
import prefillWithZeros from '../utils/prefillWithZeros'

import "./Fox.css";

const getColorFrom8Digits = digits => {
  return prefillWithZeros({
    desiredLength: 6,
    str: (digits % 0x1000000).toString(16)
  })
}

const getOuterInnerFromGenes = genes => {
  const outer = '#' + getColorFrom8Digits(genes.slice(0,8))
  const inner = '#' + getColorFrom8Digits(genes.slice(8,16))

  return {
    outer,
    inner
  }
}

const Fox = ({ genes }) => {

//  const { outer, inner } = getOuterInnerFromGenes(genes)
  const outer = '#C46500'
  const inner = 'rgb(203,46,132)'
  const ears = 'rgb(255,72,129)'

  return (
    <div className="fox-wrapper mb-3">
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
