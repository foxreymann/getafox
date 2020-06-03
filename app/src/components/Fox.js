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
  return Color(random).mix(Color(random).mix(Color(defaultCol)))
}

const getOuterInnerFromGenes = genes => {
  const defaultOuter = +genes.slice(17,1) > 4 ? '#ff7373' : '#ff0073'
  const defaultInner = +genes.slice(18,1) > 4 ? '#ff7373' : '#ff0073'

  let outer = Color('#' + getColorFrom8Digits(genes.slice(0,8)))
  let inner = Color('#' + getColorFrom8Digits(genes.slice(9,16)))

  outer = mixWithDefault(outer, defaultOuter)
  inner = mixWithDefault(inner, defaultInner)

  outer = outer.lighten(0.1).saturate(0.2)
  inner = inner.lighten(0.3).saturate(0.3)

  outer = outer.hex()
  inner = inner.hex()

  return {
    outer,
    inner
  }
}

const Fox = ({ genes }) => {

  const { outer, inner } = getOuterInnerFromGenes(genes)
  const ears = Color(outer).mix(Color(inner))

console.log({ears})

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
