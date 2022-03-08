import { objectType } from "nexus";

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.date('createdAt');
    t.nonNull.int('id');
    t.nonNull.string('email');
    t.nullable.date('deletedAt');
    t.nullable.date('updatedAt');
    t.nonNull.list.nonNull.field('links', {
      type: "Link",
      //@ts-ignore
      resolve(parent, args, ctx, info) {
        return ctx.prisma.user
          .findUnique({ where: { id: parent.id } })
          .links();
      }
    });
    t.nonNull.list.nonNull.field('votes', {
      type: 'Link',
      resolve(parent, args, ctx, info) {
        return ctx.prisma.user
          .findUnique({ where: { id: parent.id } })
          //@ts-ignore
          .votes();
      }
    });
  }
});
