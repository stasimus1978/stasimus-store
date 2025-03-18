export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Stasimus Store";
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Store description";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/";

export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValue = {
  email: "",
  password: ""
};

export const signUpDefaultValue = {
  ...signInDefaultValue,
  name: "",
  confirmPassword: ""
};

export const shippingAddressDefaultValue = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: ""
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery"];

export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || "PayPal";
