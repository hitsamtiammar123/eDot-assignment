import React, { useState } from 'react';
import { Container, Col, Row, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './App.css';

interface InputNumber {
  value: number;
  checked: boolean;
}

enum TypeValue {
  NUMBER,
  CHECKED
}

function App() {
  const [inputsNumber, setInputNumbers] = useState<Array<InputNumber>>([
    {
      value: 0,
      checked: false,
    },
    {
      value: 0,
      checked: false,
    },
    {
      value: 0,
      checked: false,
    }
  ])

  const [result, setResult] = useState<number | null>(null);

  function onValueChange(index: number, value: string | boolean, type: TypeValue){
    const newData = [...inputsNumber];
    if(type === TypeValue.NUMBER){
      newData[index] = {
        ...newData[index],
        value: Number(value)
      }
    }else if(type === TypeValue.CHECKED){
      newData[index] = {
        ...newData[index],
        checked: value as boolean
      }
    }
    setInputNumbers(newData);
  }

  function onSubmit(operation: string){
    const checkInput = inputsNumber.reduce((prev: number, curr: InputNumber) => curr.checked ? prev + 1 : prev , 0);
    if(checkInput < 2){
      alert('Please check at least two checkboxes');
      return;
    }
    const newResult = inputsNumber.slice(1).reduce((prev: number, curr: InputNumber) => {
      if(!curr.checked){
        return prev;
      }
      switch(operation){
        case '+':
          return prev + curr.value;
        case '*':
          return prev * curr.value;
        case '/':
          return prev / curr.value;
        case '-':
          return prev - curr.value
      }
      return prev;
    }, inputsNumber[0].value)
    setResult(newResult);
  }

  return (
    <Container className="App my-5">
      {inputsNumber.map((input, index) => (
        <Row key={index}>
          <Col>
            <Form.Control onChange={(e) => onValueChange(index, e.target.value, TypeValue.NUMBER)} value={input.value} type="number" />
          </Col>
          <Col>
            <Form.Check onChange={() => onValueChange(index, !input.checked, TypeValue.CHECKED)} checked={input.checked} type="checkbox" />
          </Col>
        </Row>
      ))}
      <div className="d-flex flex-row mt-4">
        <Button onClick={() => onSubmit('+')} className="me-3">+</Button>
        <Button onClick={() => onSubmit('-')} className="me-3">-</Button>
        <Button onClick={() => onSubmit('*')} className="me-3">*</Button>
        <Button onClick={() => onSubmit('/')} className="me-3">/</Button>
      </div>
      <div className="d-flex flex-row mt-4">
        <span>Hasil: {result}</span>
      </div>
    </Container>
  );
}

export default App;
