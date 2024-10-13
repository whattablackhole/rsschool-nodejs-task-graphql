import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { User } from './user.js';
import { UUIDType } from './uuid.js';

export const MutationRootType = new GraphQLObjectType({
  name: 'MutationRootType',
  fields: {
    createUser: {
      type: User,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: async (parent, args, context) => {
        const { name, balance } = args;
        const { prisma } = context;
        return prisma.user.create({ data: { name, balance } });
      },
    },
  },
});

export const QueryRootType = new GraphQLObjectType({
  name: 'QueryRootType',
  fields: {
    getUser: {
      type: User,
      args: {
        userId: { type: UUIDType },
      },
      resolve: async () => {
        return '';
      },
    },
  },
});
