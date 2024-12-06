import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: function () {
        // 添加默认值生成函数
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000);
        return `ORD-${timestamp}-${random}`;
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // 订单项目
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    // 配送地址
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    // 支付方式
    paymentMethod: {
      type: String,
      required: true,
    },
    // 支付结果
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    // 价格详情
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    // 支付状态
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    // 配送状态
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// 添加索引以确保 orderId 唯一

const Order = mongoose.model("Order", orderSchema);

export default Order;
