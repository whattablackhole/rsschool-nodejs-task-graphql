import { GraphQLNonNull, GraphQLList, GraphQLFieldConfig, ThunkObjMap } from 'graphql';
import { User } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';
import { DataLoadersContainer } from '../loader.js';
import { parse, ResolveTree } from 'graphql-parse-resolve-info';

export const UserQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  users: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),

    resolve: async (_, _args, { loaders, prisma }, info) => {
      const parsedInfo = parse(info);
      const requestedFields = parsedInfo?.fieldsByTypeName.User as ResolveTree;
      const fetchUserSubscribedTo = requestedFields['userSubscribedTo'];
      const fetchSubscribedToUser = requestedFields['subscribedToUser'];
      const loader = loaders.getUserLoader(info);
      const users = await prisma.user.findMany({
        include: {
          userSubscribedTo: !!fetchUserSubscribedTo,
          subscribedToUser: !!fetchSubscribedToUser,
        },
      });
      users.forEach((user) => loader.prime(user.id, user));
      return users;
    },
  },
  user: {
    type: User,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _,
      { id }: { id: string },
      { loaders }: { loaders: DataLoadersContainer },
      info,
    ) => {
      const users = await loaders.getUserLoader(info).load(id);
      return users;
    },
  },
};
