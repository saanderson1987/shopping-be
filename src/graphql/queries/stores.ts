import {
  arg,
  enumType,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { Prisma } from "@prisma/client";

export const StoresQueryResponse = objectType({
  name: "StoresQueryResponse",
  definition(t) {
    t.nonNull.list.nonNull.field("stores", { type: "Store" });
    t.nonNull.int("count");
    t.id("id");
  },
});

export const Sort = enumType({
  name: "Sort",
  members: ["asc", "desc"],
});

export const StoresQueryOrderByInput = inputObjectType({
  name: "LinkOrderByInput",
  definition(t) {
    t.field("description", { type: Sort });
    t.field("url", { type: Sort });
    t.field("createdAt", { type: Sort });
  },
});

export const StoresQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("stores", {
      args: {
        filter: stringArg(),
        orderBy: arg({ type: list(nonNull(StoresQueryOrderByInput)) }), // 1
        skip: intArg(),
        take: intArg(),
      },
      type: "StoresQueryResponse",
      resolve: async (parent, args, context, info) => {
        const where = args.filter ? { name: { contains: args.filter } } : {};

        const stores = await context.prisma.store.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
          orderBy: args?.orderBy as
            | Prisma.Enumerable<Prisma.StoresQueryOrderByInput>
            | undefined,
        });

        const count = await context.prisma.store.count({ where });
        const id = `stores-query:${JSON.stringify(args)}`;

        return {
          stores,
          count,
          id,
        };
      },
    });
  },
});
