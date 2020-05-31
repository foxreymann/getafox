import React from 'react';
import Fox from './Fox'
import { inject, observer } from "mobx-react";
import { Button, Modal, Container, Row, Col, FormControl, Form } from 'react-bootstrap';

const Icons = ({ }) => {
  const genes = '123456789012345678912345678'

  return (
    <div className='cover'>
      <div className='header'>
        <h1>Get</h1>
        <h1>A</h1>
        <h1>Fox</h1>
      </div>
      <Fox genes={genes} className="w-100" />
    </div>
  )
}

export default inject("web3Store")(observer(Icons));
