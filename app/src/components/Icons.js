import React from 'react';
import Fox from './Fox'
import { inject, observer } from "mobx-react";
import { Button, Modal, Container, Row, Col, FormControl, Form } from 'react-bootstrap';

const Icons = ({ }) => {
  const genes = '123456789012345678912345678'

  return (
    <Fox genes={genes} className="w-100" />
  )
}

export default inject("web3Store")(observer(Icons));
