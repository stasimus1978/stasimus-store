import { z } from "zod";

import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
  shippingAddressSchema,
  signUpFormSchema
} from "@/lib/validator";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
