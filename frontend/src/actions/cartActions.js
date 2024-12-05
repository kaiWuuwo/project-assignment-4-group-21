import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CALCULATE_TOTALS, // 新增常量
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      shippingFee: 5, // 每件商品固定运费5
    },
  });

  // 添加商品后重新计算总额
  dispatch(calculateTotals());

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // 移除商品后重新计算总额
  dispatch(calculateTotals());

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// 新增计算总额的action
export const calculateTotals = () => (dispatch, getState) => {
  const { cartItems } = getState().cart;

  // 计算商品总价
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // 计算总运费 (每件商品5)
  const shippingPrice = cartItems.reduce(
    (acc, item) => acc + item.shippingFee * item.qty,
    0,
  );

  // 计算税费 (10%)
  const taxPrice = itemsPrice * 0.1;

  // 计算总价 (商品总价 + 运费 + 税费)
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  dispatch({
    type: CART_CALCULATE_TOTALS,
    payload: {
      itemsPrice: Number(itemsPrice.toFixed(2)),
      shippingPrice: Number(shippingPrice.toFixed(2)),
      taxPrice: Number(taxPrice.toFixed(2)),
      totalPrice: Number(totalPrice.toFixed(2)),
    },
  });
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
