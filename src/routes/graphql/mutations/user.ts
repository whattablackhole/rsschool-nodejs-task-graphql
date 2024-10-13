import { ThunkObjMap, GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from "graphql";
import { CreateUserInput, ChangeUserInput } from "../types/inputs.js";
import { User } from "../types/user.js";
import { UUIDType } from "../types/uuid.js";

export const UserMutations: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  createUser: {
    type: new GraphQLNonNull(User),
    args: {
      dto: { type: new GraphQLNonNull(CreateUserInput) },
    },
    resolve: async (parent, args, context) => {
      const { name, balance } = args;
      const { prisma } = context;
      return prisma.user.create({ data: { name, balance } });
    },
  },
  changeUser: {
    type: new GraphQLNonNull(User),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeUserInput) },
    },
    resolve: async () => {},
  },
  deleteUser: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async () => {},
  },
  subscribeTo: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async () => {},
  },
  unsubscribeFrom: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async () => {},
  },
};