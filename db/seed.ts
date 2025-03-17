import { PrismaClient } from "@prisma/client";

import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  // await prisma.user.deleteMany();
  // await prisma.user.createMany({ data: sampleData.users })

  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: sampleData.products });

  console.log("Database >>> seeded successfully!");
}

main();
