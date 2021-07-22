import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Size, SIZES, Topping, TOPPINGS } from "../../constants/common";
import { ActionTypes } from "./reducer";
import { AppDispatch } from "../../store"
import { State } from "../../Types/common";
import clsx from "clsx";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";

export default function Recipe() {
  const dispatch = useDispatch<AppDispatch>();
  const { base, toppings = [] } = useSelector((state: State) => state.recipe);
  const history = useHistory()

  function selectBase(size: Size) {
    dispatch({
      type: ActionTypes.SET_BASE,
      payload: size
    })
  }

  function selectTopping(topping: Topping) {
    dispatch({
      type: ActionTypes.SET_TOPPING,
      payload: topping
    })
  }

  const total = useMemo(() => {
    const basePrice = base?.price
    const toppingPrice = toppings?.length ? toppings?.map((a: Topping) => a.price)?.reduce((a: number, b: number) => a + b) : 0

    console.log({ basePrice, toppingPrice })
    return basePrice + toppingPrice
  }, [base, toppings.length])

  return (
    <Container>
      <Row>
        <Col xs="12" sm="6" md="8" lg="9">
          <Row>
            <Col xs="12" sm="12" md="12">
              <div className="cc-header">
                <h2>Select Base</h2>
              </div>
            </Col>
          </Row>
          <Row>
            {SIZES.map((size: Size) => {
              const isSelected = base?.label === size.label
              return (
                <Col xs="12" sm="6" md="4" lg="3" key={size.label}>
                  <div
                    className={clsx("cc-item-card", { selected: isSelected })}
                    onClick={() => selectBase(size)}
                  >
                    <h3>{size.label}</h3>
                    <p>${(size.price).toFixed(2)}</p>
                  </div>
                </Col>
              )
            })}
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12">
              <div className="cc-header">
                <h2>Select Toppings</h2>
              </div>
            </Col>
          </Row>
          <Row>
            {TOPPINGS.map((topping: Topping) => {
              const isSelected = toppings.findIndex((item: Topping) => item.label === topping.label)
              return (
                <Col xs="12" sm="6" md="4" lg="3" key={topping.label}>
                  <div
                    className={clsx("cc-item-card", { selected: isSelected !== -1, disabled: !base.label })}
                    onClick={() => selectTopping(topping)}
                  >
                    <h3>{topping.label}</h3>
                    <p>${(topping.price).toFixed(2)}</p>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Col>
        <Col xs="12" sm="6" md="4" lg="3">
          <div className="cc-checkout-card">
            <div className="cc-header">
              <h2>Your Order</h2>
            </div>
            <div className="checkout-items">
              <p>Selected Size</p>
              <ul>
                <li>
                  <p>{base.label}</p>
                  <span>${(base.price).toFixed(2)}</span>
                </li>
              </ul>

              {toppings?.length ? <>
                <p>Added Toppings</p>
                <ul>
                  {toppings?.map((topping: Topping) => <li key={topping.label + 'd'}>
                    <p>{topping.label}</p>
                    <span>${(topping.price).toFixed(2)}</span>
                  </li>)}
                </ul>
              </> : null}
              <div className="totals">
                <p>Total</p>
                <span>${(total).toFixed(2)}</span>
              </div>
              <div className="d-grid gap-2">
                <Button
                  variant="success"
                  onClick={() => history.push('/payment')}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}