import { prisma } from "./lib/prisma";

async function main() {
  await prisma.admin.create({
    data: {
      name: "Cristovao",
      email: "cristovo@gmail.com",
      password: "zoba123",
    },
  });
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
