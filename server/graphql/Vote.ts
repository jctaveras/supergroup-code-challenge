import { User } from "@prisma/client";
import { extendType, intArg, nonNull, objectType } from "nexus";

export const Vote = objectType({
  name: 'Vote',
  definition(t) {
    t.nonNull.field('link', { type: 'Link' });
    t.nonNull.field('user', { type: 'User' });
  }
});

export const VoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('vote', {
      type: 'Vote',
      args: {
        linkId: nonNull(intArg())
      },
      //@ts-ignore
      async resolve(parent, args, ctx, info) {
        const { userId } = ctx;
        const { linkId } = args;

        if (!userId) {
          throw new Error('Unauthorized');
        }

        const link = await ctx.prisma.link.update({
          where: { id: linkId },
          data: {
            //@ts-ignore
            voters: {
              connect: { id: userId }
            }
          },
        });
        const user = await ctx.prisma.user.findUnique({ where: { id: userId } });

        return {
          link,
          user: user as User
        }
      },
    })
  }
});