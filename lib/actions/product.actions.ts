"use server";

import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

import { prisma } from "@/db/prisma";

export async function getLatestProducts() {
  const latestProducts = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" }
  });

  return convertToPlainObject(latestProducts);
}

// Get single product by it`s slug
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug }
  });

  return convertToPlainObject(product);
}
