import Joi from 'joi';
import { ChangeEvent, FormEvent, useReducer } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/common';
import store from '../../store';
import { setUserInfo } from './actions';

interface Errors {
  username?: boolean;
  phone?: boolean;
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
  switch (action.type) {
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

type keys = 'username' | 'phone'

export default function User() {
  const [state, setState] = useReducer(reducer, initState)
  const dispatch = useAppDispatch();
  const history = useHistory();

  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Invalid name.',
        'string.max': 'Invalid name',
      }),
    phone: Joi.string()
      .alphanum()
      .min(8)
      .max(16)
      .messages({
        'string.empty': 'Phone number is required',
        'string.min': 'Invalid Phone number',
        'string.max': 'Invlid Phone number'
      })
  }).options({
    abortEarly: false
  })

  function isValid(): boolean {
    const errors: Errors = {}
    const { error } = schema.validate({ username: state.username, phone: state.phone });
    if (error) {
      error && error.details.forEach((err: any) => errors[err.context.key as keys] = err.message)
      setState({
        type: Actions.SET_ERRORS,
        payload: errors
      })
      return false
    }
    return true
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid()) return;
    dispatch(setUserInfo({
      username: state.username,
      phone: state.phone
    }));
    history.push("/recipe");
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <div className="cc-form-wrapper">
            <div className="inner-form">
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
                  {state?.errors?.username && <p className="cc-error text-danger">
                    {state.errors.username}
                  </p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    value={state.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if ((/^[0-9]{0,16}$/).test(e.target.value)) {
                        setState({
                          type: Actions.SET_PHONE,
                          payload: e.target.value
                        })
                      }
                    }}
                  />
                  {state?.errors?.phone && <p className="cc-error text-danger">
                    {state.errors.phone}
                  </p>}
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}