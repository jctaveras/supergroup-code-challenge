import { Prisma } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg, intArg, nullable, enumType, arg, list, inputObjectType, subscriptionField } from "nexus";

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.date('createdAt');
    t.nonNull.int('id');
    t.nonNull.string('description');
    t.nonNull.string('url');
    t.nullable.date('deletedAt');
    t.nullable.date('updatedAt');
    t.nullable.field('postedBy', {
      type: 'User',
      //@ts-ignore
      resolve(parent, args, ctx, info) {
        return ctx.prisma.link
          .findUnique({ where: { id: parent.id }})
          .postedBy();
      }
    });
    t.nonNull.list.nonNull.field('voters', {
      type: 'User',
      resolve(parent, args, ctx, info) {
        return ctx.prisma.link
          .findUnique({ where: { id: parent.id } })
          //@ts-ignore
          .voters();
      }
    });
  },
});

export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('feed', {
      type: 'Feed',
      args: {
        filter: nullable(stringArg()),
        skip: nullable(intArg()),
        take: nullable(intArg()),
        orderBy: arg({ type: list(nonNull('LinkOrderByInput')) }),
      },
      async resolve(parent, args, ctx, info) {
        const where = args.filter
          ? {
            OR: [
              { description: { contains: args.filter } },
              { url: { contains: args.filter } },
            ]
          }
          : {};
        const links = await ctx.prisma.link.findMany({
          where,
          skip: args?.skip as number | undefined,
          take: args?.take as number | undefined,
          orderBy: args?.orderBy as Prisma.Enumerable<Prisma.LinkOrderByWithRelationInput> | undefined,
        });
        const count = await ctx.prisma.link.count({ where });

        return { links, count };
      },
    });
  }
});

export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, ctx, info) {
        if (!ctx.userId) {
          throw new Error('Unauthorized!');
        }

        const link = ctx.prisma.link.create({
          data: {
            description: args.description,
            url: args.url,
            postedBy: { connect: { id: ctx.userId } }
          },
        });

        return link;
      }
    });
  }
});

export const LinkOrderByInput = inputObjectType({
  name: 'LinkOrderByInput',
  definition(t) {
    t.nullable.field('description', { type: Sort });
    t.nullable.field('url', { type: Sort });
    t.nullable.field('createdAt', { type: Sort });
  }
});

export const Sort = enumType({
  name: 'Sort',
  members: ['asc', 'desc'],
});

export const Feed = objectType({
  name: 'Feed',
  definition(t) {
    t.nonNull.list.nonNull.field('links', { type: 'Link' });
    t.nonNull.int('count');
  } 
});
