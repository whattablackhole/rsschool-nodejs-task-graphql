import { GraphQLNonNull, GraphQLList, GraphQLFieldConfig, ThunkObjMap } from 'graphql';
import { User } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';

export const UserQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  users: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),

    resolve: async () => {
      return '';
    },
  },
  user: {
    type: User,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async () => {
      return '';
    },
  },
};
