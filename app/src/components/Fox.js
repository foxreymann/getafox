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

const mix3 = (ears, outer, inner) => {
  return Color.rgb(
    Math.round((ears.color[0] + outer.color[0] + inner.color[0]) / 3),
    Math.round((ears.color[1] + outer.color[1] + inner.color[1]) / 3),
    Math.round((ears.color[2] + outer.color[2] + inner.color[2]) / 3)
  )
}

const getOuterInnerFromGenes = genes => {
  const defaultOuter = +genes.slice(24,25) > 4 ? '#ff7373' : '#cc00a3'
  const defaultInner = +genes.slice(25,26) > 4 ? '#ff7373' : '#cc00a3'
  const defaultEars = +genes.slice(26,27) > 4 ? '#ff7373' : '#cc00a3'

  let outer = Color('#' + getColorFrom8Digits(genes.slice(0,8)))
  let inner = Color('#' + getColorFrom8Digits(genes.slice(8,16)))
  let ears = Color('#' + getColorFrom8Digits(genes.slice(16,24)))

  outer = mixWithDefault(outer, defaultOuter)
  inner = mixWithDefault(inner, defaultInner)
  ears = mixWithDefault(ears, defaultEars)

  ears = mix3(ears, outer, inner)

  if(!outer.isLight()) {
    outer = outer.lighten(0.1)
  }
  outer = outer.saturate(0.25)

  if(!inner.isLight()) {
    inner = inner.lighten(0.3)
  }
  inner = inner.saturate(0.9)

  if(!ears.isLight()) {
    ears = ears.lighten(0.2)
  }
  ears = ears.saturate(0.4)


  outer = outer.hex()
  inner = inner.hex()
  ears = ears.hex()

  return {
    outer,
    inner,
    ears
  }
}

const Fox = ({ genes }) => {

  const { outer, inner, ears } = getOuterInnerFromGenes(genes)

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
        <div className="tail" style={{ background: outer }}>
          <div className='before' style={{
          }}></div>
        </div>
      </div>
    </div>
  )
};

export default Fox;
