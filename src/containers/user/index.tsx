import Joi, { boolean } from 'joi';
import React, { ChangeEvent, FormEvent, useReducer } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';


interface Errors {
  username?: boolean;
  phone?: boolean;
}

enum ErrorTexts {
  username = 'Name is required.',
  phone = 'Phone is required.'
}

interface State {
  username: string;
  phone: string;
  errors: Errors;
}

const initState: State = {
  username: '',
  phone: '',
  errors: {}
}

interface ActionType {
  type: Actions;
  payload?: any
}

enum Actions {
  SET_NAME = 'SET_NAME',
  SET_PHONE = 'SET_PHONE',
  SET_ERRORS = 'SET_ERRORS'
}

function reducer(state: State, action: ActionType) {
  switch(action.type) {
    case Actions.SET_NAME:
      return {
        ...state,
        username: action.payload
      }
    case Actions.SET_PHONE:
      return {
        ...state,
        phone: action.payload
      }
    case Actions.SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state;
  }
}

export default function User() {
  const [state, setState] = useReducer(reducer, initState)

  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .messages({
        'any.required': ErrorTexts.username,
        'string.min': ErrorTexts.username,
        'string.max': 'Invalid username',
      }),
    phone: Joi.string()
      .alphanum()
      .min(8)
      .max(16)
      .messages({
        'string.required': ErrorTexts.phone
      })
  }).options({
    abortEarly: false
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { error, value } = schema.validate({ username: state.username, phone: state.phone });
    console.log(error, value, 'validate error state');
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={state.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setState({
                    type: Actions.SET_NAME,
                    payload: e.target.value
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone"
                  value={state.phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setState({
                    type: Actions.SET_PHONE,
                    payload: e.target.value
                  })}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}