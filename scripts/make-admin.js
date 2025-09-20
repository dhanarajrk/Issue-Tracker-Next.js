//To Manually promote a User Role to ADMIN 

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: { email: 'dhanarajrk51@gmail.com' },
    data: { role: 'ADMIN' },
  });

  console.log("Admin user updated!");
}

//execute main() and catch any error
main()
  .catch((e) => {
    console.error("Error:", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect(); //$disconnect() closes all active connections otherwise DB connections may stay open
  });
