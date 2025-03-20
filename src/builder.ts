import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaUtils from "@pothos/plugin-prisma-utils";
import PothosPrismaGeneratorPlugin from "pothos-prisma-generator";
import { prisma } from "./prisma.js";

/**
 * Create a new schema builder instance
 */
export const createBuilder = () => {
  return new SchemaBuilder<{
    Prisma: typeof prisma;
  }>({
    plugins: [PrismaPlugin, PrismaUtils, PothosPrismaGeneratorPlugin],
    prisma: {
      client: prisma,
    },
  });
};

export type Builder = ReturnType<typeof createBuilder>;
