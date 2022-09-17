import { objectType } from "nexus";

export const Store = objectType({
  name: "Store",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.field("neighborhood", {
      type: "Neighborhood",
      resolve(parent, args, context) {
        return context.prisma.store
          .findUnique({ where: { id: parent.id } })
          .neighborhood();
      },
    });
  },
});
