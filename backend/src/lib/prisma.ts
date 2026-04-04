import { PrismaNeon } from "@prisma/adapter-neon";
import env from "../env.ts";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaNeon({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;
