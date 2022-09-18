import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const neighborhoods = await prisma.neighborhood.findMany();
  const stores = await prisma.store.findMany();

  console.log(
    JSON.stringify(
      {
        neighborhoods,
        stores,
      },
      null,
      2
    )
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
