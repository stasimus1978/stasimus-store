import { prisma } from "./prisma";
import sampleData from "./sample-data";

async function main() {
  // await prisma.user.deleteMany();
  // await prisma.user.createMany({ data: sampleData.users })

  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: sampleData.products });

  console.log("Database >>> seeded successfully!");
}

main();
