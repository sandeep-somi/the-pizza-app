import { Row, Col, Container, Form } from "react-bootstrap";

export default function Payment() {

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <div>
            <h1 className="text-center">Payment</h1>
            <h3>Enter Card Details</h3>
            <Form.Group>
              <Form.Label>Card number</Form.Label>
              <Form.Control />
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Container>
  )
}