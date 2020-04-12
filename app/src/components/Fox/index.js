import React from 'react';
import ColorMixer from 'ryb-color-mixer';
import prefillWithZeros from 'utils/prefillWithZeros'

import "./Fox.css";

const getColorFrom8Digits = digits => {
  return prefillWithZeros({
    desiredLength: 6,
    str: (digits.slice(0,8) % 16**6).toString(16)
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
