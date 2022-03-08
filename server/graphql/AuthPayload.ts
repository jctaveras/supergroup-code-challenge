import { extendType, nonNull, objectType, stringArg } from "nexus";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { APP_SECRET } from "../utils/auth";

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token');
    t.nonNull.field('user', {
      type: 'User'
    });
  }
});

export const AuthMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signup', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx, info) {
        const { email } = args;
        const password = await bcrypt.hash(args.password, 20);
        const user = await ctx.prisma.user.create({
          data: {
            email,
            password
          }
        });
        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return { token, user };
      }
    });

    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      //@ts-ignore
      async resolve(parent, args, ctx, info) {
        const { email } = args;
        //@ts-ignore
        const user = await ctx.prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error('Not user found');
        }

        const isValid = await bcrypt.compare(args.password, user.password );

        if (!isValid) {
          throw new Error('Invalid Password');
        }

        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return { token, user };
      }
    });
  }
});
