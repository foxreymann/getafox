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

const mixWithDefault = (random, defaultCol) => {
  return ColorMixer.mix(random, random, random, defaultCol, { result: "rgb" })
}

const getOuterInnerFromGenes = genes => {
  const defaultOuter = 'ff7373'
  const defaultInner = 'ff7373'

  const outer = '#' + mixWithDefault(getColorFrom8Digits(genes.slice(0,8)), defaultOuter)
  const inner = '#' + mixWithDefault(getColorFrom8Digits(genes.slice(8,16)), defaultInner)

  return {
    outer,
    inner
  }
}

const Fox = ({ genes }) => {

  const { outer, inner } = getOuterInnerFromGenes(genes)
  const ears = '#' + ColorMixer.mix(outer, inner, { result: "rgb" })

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
