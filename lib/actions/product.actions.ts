"use server";

import { PrismaClient } from "@prisma/client";

import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

export async function getLatestProducts() {
  const prisma = new PrismaClient();

  const latestProducts = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" }
  });

  return convertToPlainObject(latestProducts);
}
