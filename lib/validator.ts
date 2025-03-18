import { z } from "zod";

import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))));

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  numReviews: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must be at least 1 image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  colors: z.array(z.string()).min(1, "Product must be at least 1 color"),
  sizes: z.array(z.string()).min(1, "Product must be at least 1 size"),
  price: currency
});

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters")
  })
  .and(signInFormSchema)
  .refine(data => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"]
  });

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: currency
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session Cart Id is required"),
  userId: z.string().optional().nullable()
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  lat: z.number().optional(),
  lng: z.number().optional()
});
