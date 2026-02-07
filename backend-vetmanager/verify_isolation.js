const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function verifyIsolation() {
  console.log("--- Starting Isolation Verification ---");

  // 1. Setup two test users
  const userA_email = "userA@test.com";
  const userB_email = "userB@test.com";

  // Cleanup existing test users if they exist
  await prisma.client.deleteMany({ where: { user: { email: { in: [userA_email, userB_email] } } } });
  await prisma.user.deleteMany({ where: { email: { in: [userA_email, userB_email] } } });

  const userA = await prisma.user.create({ data: { email: userA_email, name: "User A" } });
  const userB = await prisma.user.create({ data: { email: userB_email, name: "User B" } });

  console.log(`Created test users: ${userA.email} (ID: ${userA.id}), ${userB.email} (ID: ${userB.id})`);

  // 2. User A creates a client
  const clientA = await prisma.client.create({
    data: {
      name: "Client of A",
      phone: "123456",
      user_id: userA.id
    }
  });
  console.log(`User A created client: ${clientA.name} (ID: ${clientA.id})`);

  // 3. Verify User B cannot find User A's client using findFirst with user_id filter
  const foundByB = await prisma.client.findFirst({
    where: {
      id: clientA.id,
      user_id: userB.id
    }
  });

  if (foundByB === null) {
    console.log("✅ SUCCESS: User B cannot find User A's client.");
  } else {
    console.error("❌ FAILURE: User B found User A's client!");
  }

  // 4. Verify User B cannot update User A's client
  try {
    await prisma.client.update({
      where: {
        id: clientA.id,
        user_id: userB.id
      },
      data: { name: "Hacked name" }
    });
    console.error("❌ FAILURE: User B was able to update User A's client!");
  } catch (error) {
    console.log("✅ SUCCESS: User B failed to update User A's client (Record not found).");
  }

  // 5. Verify User A CAN find their own client
  const foundByA = await prisma.client.findFirst({
    where: {
      id: clientA.id,
      user_id: userA.id
    }
  });

  if (foundByA && foundByA.id === clientA.id) {
    console.log("✅ SUCCESS: User A can find their own client.");
  } else {
    console.error("❌ FAILURE: User A could NOT find their own client!");
  }

  // Cleanup
  await prisma.client.deleteMany({ where: { user: { email: { in: [userA_email, userB_email] } } } });
  await prisma.user.deleteMany({ where: { email: { in: [userA_email, userB_email] } } });

  console.log("--- Isolation Verification Finished ---");
}

verifyIsolation()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });