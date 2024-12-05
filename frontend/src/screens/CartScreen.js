import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom"; // 修改为 v5 的导入
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import {
  addToCart,
  removeFromCart,
  calculateTotals,
} from "../actions/cartActions";

const CartScreen = ({ match, location }) => {
  // 使用 v5 的 props
  const history = useHistory();
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    dispatch(calculateTotals());
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=/shipping"); // 使用 history.push
  };

  return (
    <>
      <h2 className="sub-heading">Shopping Cart</h2>
      <Row>
        <Col lg={8}>
          <Card className="box mb-3">
            {cartItems.length === 0 ? (
              <Message>
                Your Cart is empty <Link to="/">Back To Shopping</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.product} className="px-0">
                    <Row className="align-items-center">
                      <Col xs={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col xs={4}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col xs={2} className="text-center">
                        ${item.price}
                      </Col>
                      <Col xs={2}>
                        <Form.Control
                          as="select"
                          size="sm"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value)),
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col xs={2} className="text-center">
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="box">
            <ListGroup variant="flush">
              <ListGroup.Item className="px-0 pt-0">
                <h2 className="pt-0">
                  Sub-total (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                <div className="font-weight-bold">${itemsPrice}</div>
              </ListGroup.Item>
              <ListGroup.Item className="px-0">
                <Row>
                  <Col>Shipping:</Col>
                  <Col className="text-right">${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="px-0">
                <Row>
                  <Col>Tax (10%):</Col>
                  <Col className="text-right">${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="px-0">
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col className="text-right">
                    <strong>${totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="px-0 pb-0">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
