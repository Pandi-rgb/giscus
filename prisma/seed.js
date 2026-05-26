const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
    },
  });

  await prisma.article.createMany({
    data: [
      {
        title: "Artificial Intelligence in Education",
        slug: "artificial-intelligence-in-education",
        excerpt: "Exploring AI implementation in modern education.",
        content:
          "This research discusses the impact of AI in educational environments.",
        published: true,
        authorId: user.id,
      },
      {
        title: "Cloud Computing Architecture",
        slug: "cloud-computing-architecture",
        excerpt: "Research about scalable cloud systems.",
        content:
          "This article explains cloud-native infrastructure and scalability.",
        published: true,
        authorId: user.id,
      },
    ],
  });
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
