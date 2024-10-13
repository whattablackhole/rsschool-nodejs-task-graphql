import { GraphQLNonNull, GraphQLList, GraphQLFieldConfig, ThunkObjMap } from 'graphql';
import { User } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';
import { httpErrors } from '@fastify/sensible';

export const UserQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  users: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),

    resolve: async (_, _args, { prisma }) => {
      return await prisma.user.findMany();
    },
  },
  user: {
    type: User,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (user === null) {
        throw httpErrors.notFound();
      }
      return user;
    },
  },
};
