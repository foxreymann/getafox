import React from 'react';
import Fox from './Fox'
import { inject, observer } from "mobx-react";
import { Button, Modal, Container, Row, Col, FormControl, Form } from 'react-bootstrap';

const Icons = ({ }) => {
  return (
    <div className='icon'>
      <Fox genes="icon-fox"/>
    </div>
  )
}

export default inject("web3Store")(observer(Icons));
