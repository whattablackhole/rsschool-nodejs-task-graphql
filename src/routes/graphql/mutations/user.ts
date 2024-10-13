import { ThunkObjMap, GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { CreateUserInput, ChangeUserInput } from '../types/inputs.js';
import { User } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';

export const UserMutations: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  createUser: {
    type: new GraphQLNonNull(User),
    args: {
      dto: { type: new GraphQLNonNull(CreateUserInput) },
    },
    resolve: async (_, args, context) => {
      const { dto } = args;
      const { prisma } = context;
      return await prisma.user.create({ data: dto });
    },
  },
  changeUser: {
    type: new GraphQLNonNull(User),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeUserInput) },
    },
    resolve: async (_, args, context) => {
      const { id, dto } = args;
      const { prisma } = context;
      return await prisma.user.update({
        where: { id: id },
        data: dto,
      });
    },
  },
  deleteUser: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args, context) => {
      const { id } = args;
      const { prisma } = context;
      await prisma.user.delete({
        where: {
          id,
        },
      });
      return 'Ok';
    },
  },
  subscribeTo: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args, context) => {
      const { userId, authorId } = args;
      const { prisma } = context;
      await prisma.subscribersOnAuthors.create({
        data: {
          subscriberId: userId,
          authorId,
        },
      });
      return 'Ok';
    },
  },
  unsubscribeFrom: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args, context) => {
      const { userId, authorId } = args;
      const { prisma } = context;
      await prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId,
          },
        },
      });
      return 'Ok';
    },
  },
};
