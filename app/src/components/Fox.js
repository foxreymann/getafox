import React from 'react';
import Color from 'color';
import prefillWithZeros from '../utils/prefillWithZeros'

import "./Fox.css";

const getColorFrom8Digits = digits => {
  return prefillWithZeros({
    desiredLength: 6,
    str: (digits % 0x1000000).toString(16)
  })
}

const mixWithDefault = (random, defaultCol) => {
  return random
}

const getOuterInnerFromGenes = genes => {
  const defaultOuter = '#ffffff'
  const defaultInner = '#ffffff'

  let outer = Color('#' + getColorFrom8Digits(genes.slice(0,8)))
  let inner = Color('#' + getColorFrom8Digits(genes.slice(9,16)))
console.log({outer})

  outer = outer.hex()
  inner = inner.hex()

  return {
    outer,
    inner
  }
}

const Fox = ({ genes }) => {

  const { outer, inner } = getOuterInnerFromGenes(genes)
  const ears = '#f00'

  return (
    <div className="fox-wrapper mb-3">
      <div>{outer} {inner}</div>
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
