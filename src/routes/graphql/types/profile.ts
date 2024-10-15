import { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType, MemberTypeId } from './member-type.js';
import { DataLoadersContainer } from '../loader.js';

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (
        parent,
        _args,
        { loaders }: { loaders: DataLoadersContainer },
        info,
      ) => {
        return await loaders.getMemberTypeLoader(info).load(parent.memberTypeId);
      },
    },
    userId: { type: new GraphQLNonNull(UUIDType) },
  }),
});
