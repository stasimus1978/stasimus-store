import { z } from "zod";

import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  paymentMethodSchema,
  shippingAddressSchema,
  signUpFormSchema
} from "@/lib/validator";

//
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

//
export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

//
export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;

//
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
//
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
//
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderItems: OrderItem[];
  user: { name: string; email: string };
};
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
