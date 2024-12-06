import {GraphQLObjectType } from 'graphql';
import { PostMutations } from './mutations/post.js';
import { ProfileMutations } from './mutations/profile.js';
import { UserMutations } from './mutations/user.js';
import { MemberTypeQueries } from './queries/member-type.js';
import { UserQueries } from './queries/user.js';
import { PostQueries } from './queries/post.js';
import { ProfileQueries } from './queries/profile.js';

export const MutationRootType = new GraphQLObjectType({
  name: 'MutationRootType',
  fields: {
    ...UserMutations,
    ...ProfileMutations,
    ...PostMutations,
  },
});

export const QueryRootType = new GraphQLObjectType({
  name: 'QueryRootType',
  fields: {
    ...MemberTypeQueries,
    ...UserQueries,
    ...PostQueries,
    ...ProfileQueries
  },
});
