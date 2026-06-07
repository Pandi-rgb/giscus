const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      {
        name: "Artikel",
        slug: "artikel",
      },

      {
        name: "Berita",
        slug: "berita",
      },

      {
        name: "Jurnal",
        slug: "jurnal",
      },
    ],

    skipDuplicates: true,
  });

  console.log("Categories seeded!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
