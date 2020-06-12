import React from 'react';
import Fox from './Fox'
import { inject, observer } from "mobx-react";
import { Button, Modal, Container, Row, Col, FormControl, Form } from 'react-bootstrap';

const Cover = ({ }) => {
  return (
    <div className='cover'>
      <Fox genes='left'/>
      <div className='header'>
        <h1>GET</h1>
        <h1>A</h1>
        <h1>FOX</h1>
      </div>
      <Fox genes='right'/>
    </div>
  )
}

export default inject("web3Store")(observer(Cover));
