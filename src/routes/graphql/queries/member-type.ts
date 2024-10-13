import { GraphQLNonNull, GraphQLList, ThunkObjMap, GraphQLFieldConfig } from 'graphql';
import { MemberType, MemberTypeId } from '../types/member-type.js';

export const MemberTypeQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  memberTypes: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),

    resolve: async () => {
      return '';
    },
  },
  memberType: {
    type: MemberType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeId) },
    },
    resolve: async () => {
      return '';
    },
  },
};
