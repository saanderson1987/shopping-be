import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createStoresForNeighborhood = (neighborhoodId: number) =>
  prisma.store.createMany({
    data: new Array(4).fill(1).map((_, idx) => ({
      name: `store_${idx}`,
      neighborhoodId,
    })),
  });

async function main() {
  const soho = await prisma.neighborhood.upsert({
    where: { name: "Soho" },
    update: {},
    create: {
      name: "Soho",
    },
  });

  const midtown5thAve = await prisma.neighborhood.upsert({
    where: { name: "Midtown - 5th Ave" },
    update: {},
    create: {
      name: "Midtown - 5th Ave",
    },
  });

  const stores = await Promise.all([
    createStoresForNeighborhood(soho.id),
    createStoresForNeighborhood(midtown5thAve.id),
  ]);

  console.log(
    JSON.stringify({
      soho,
      midtown5thAve,
      stores,
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
