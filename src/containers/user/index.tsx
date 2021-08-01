import Joi from 'joi';
import { ChangeEvent, FC, FormEvent, useReducer } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/common';
import store from '../../store';
import { setUserInfo } from './actions';

interface Errors {
  username?: string | undefined;
  phone?: string | undefined;
  houseNumber?: string | undefined;
  streetName?: string | undefined;
  city?: string | undefined;
  postalCode?: string | undefined;
}

interface State {
  username: string;
  phone: string;
  errors: Errors;
  houseNumber: string;
  streetName: string;
  city: string;
  postalCode: string;
}

const initState: State = {
  username: '',
  phone: '',
  errors: {},
  houseNumber: '',
  streetName: '',
  city: '',
  postalCode: '',
}

interface ActionType {
  type: Actions;
  payload?: any;
}

enum Actions {
  SET_NAME = 'SET_NAME',
  SET_PHONE = 'SET_PHONE',
  SET_ERRORS = 'SET_ERRORS',
  SET_HOUSE_NUMBER = 'SET_HOUSE_NUMBER',
  SET_STREET = 'SET_STREET',
  SET_CITY = 'SET_STREET',
  SET_POSTAL_CODE = 'SET_POSTAL_CODE'
}

function reducer(state: State, action: ActionType) {
  switch (action.type) {
    case Actions.SET_NAME:
      return {
        ...state,
        username: action.payload,
        errors: {
          ...state.errors,
          username: ''
        },
      }
    case Actions.SET_PHONE:
      return {
        ...state,
        phone: action.payload,
        errors: {
          ...state.errors,
          phone: ''
        },
      }
    case Actions.SET_HOUSE_NUMBER:
      return {
        ...state,
        houseNumber: action.payload,
        errors: {
          ...state.errors,
          houseNumber: ''
        },
      }
    case Actions.SET_STREET:
      return {
        ...state,
        streetName: action.payload,
        errors: {
          ...state.errors,
          streetName: ''
        },
      }
    case Actions.SET_CITY:
      return {
        ...state,
        city: action.payload,
        errors: {
          ...state.errors,
          city: ''
        },
      }
    case Actions.SET_POSTAL_CODE:
      return {
        ...state,
        postalCode: action.payload,
        errors: {
          ...state.errors,
          postalCode: ''
        },
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

type keys = 'username' | 'phone' // | 'houseNumber' | 'streetName' | 'city' | 'postalCode'

export default function User() {
  const [state, setState] = useReducer(reducer, initState)
  const dispatch = useAppDispatch();
  const history = useHistory();

  const schema = Joi.object({
    username: Joi.string()
      .string()
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
      }),
    houseNumber: Joi.string()
      .string()
      .required()
      .messages({
        'string.empty': "House number is required"
      }),
    streetName: Joi.string()
      .string()
      .required()
      .messages({
        'string.empty': "Street name is required"
      }),
    city: Joi.string()
      .string()
      .required()
      .messages({
        'string.empty': "City name is required"
      }),
    postalCode: Joi.string()
      .string()
      .required()
      .messages({
        'string.empty': "Postal code is required"
      })
  }).options({
    abortEarly: false
  })

  function isValid(): boolean {
    const errors: Errors = {}
    const { error } = schema.validate({ username: state.username, phone: state.phone });
    if (error) {
      error && error.details.forEach((err: any) => errors[err.context.key as keys] = err.message);
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
              <h2 className="form-title">Basic Info</h2>
              <Form onSubmit={handleSubmit}>
                <FormInput
                  id="name"
                  label="Name"
                  placeholder="Name"
                  value={state.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setState({
                    type: Actions.SET_NAME,
                    payload: e.target.value
                  })}
                  error={state?.errors?.username || ''}
                />
                <FormInput
                  id="phone"
                  label="Phone"
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
                  error={state?.errors?.phone || ''}
                />
                <div className="cc-address-form">
                  <h2 className="form-title">Address</h2>
                  <FormInput
                    id="houseNumber"
                    label="House Number"
                    placeholder="House Number"
                    value={state.houseNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if ((/^[0-9]{0,16}$/).test(e.target.value)) {
                        setState({
                          type: Actions.SET_HOUSE_NUMBER,
                          payload: e.target.value
                        })
                      }
                    }}
                    error={state?.errors?.houseNumber || ''}
                  />
                  <FormInput
                    id="streetName"
                    label="Street Name"
                    placeholder="Street Name"
                    value={state.streetName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if ((/^[0-9]{0,16}$/).test(e.target.value)) {
                        setState({
                          type: Actions.SET_STREET,
                          payload: e.target.value
                        })
                      }
                    }}
                    error={state?.errors?.streetName || ''}
                  />
                  <FormInput
                    id="city"
                    label="City"
                    placeholder="City"
                    value={state.city}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if ((/^[0-9]{0,16}$/).test(e.target.value)) {
                        setState({
                          type: Actions.SET_CITY,
                          payload: e.target.value
                        })
                      }
                    }}
                    error={state?.errors?.city || ''}
                  />
                  <FormInput
                    id="postalCode"
                    label="Postal Code"
                    placeholder="Post Code"
                    value={state.postalCode}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if ((/^[0-9]{0,16}$/).test(e.target.value)) {
                        setState({
                          type: Actions.SET_POSTAL_CODE,
                          payload: e.target.value
                        })
                      }
                    }}
                    error={state?.errors?.postalCode || ''}
                  />
                </div>
                <div className="d-grid gap-2 mt-4">
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

interface FormInputProps {
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  type?: string;
}

const FormInput: FC<FormInputProps> = (props) => {
  const {
    id = '',
    value = '',
    onChange = () => [],
    placeholder = 'Input',
    error = '',
    label = 'Input',
    type = 'text',
  } = props

  return (
    <Form.Group className="mb-2" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="cc-error text-danger">
        {error}
      </p>}
    </Form.Group>
  )
}