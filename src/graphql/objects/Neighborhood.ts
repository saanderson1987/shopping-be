import { objectType } from "nexus";

export const Neighborhood = objectType({
  name: "Neighborhood",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.list.nonNull.field("stores", {
      type: "Store",
      resolve(parent, args, context) {
        return context.prisma.neighborhood
          .findUnique({ where: { id: parent.id } })
          .stores();
      },
    });
  },
});
