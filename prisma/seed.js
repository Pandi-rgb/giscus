const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      {
        name: "AI",
        slug: "ai",
      },

      {
        name: "Web Development",

        slug: "web-development",
      },

      {
        name: "Research",

        slug: "research",
      },

      {
        name: "Machine Learning",

        slug: "machine-learning",
      },

      {
        name: "UI/UX",

        slug: "ui-ux",
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
