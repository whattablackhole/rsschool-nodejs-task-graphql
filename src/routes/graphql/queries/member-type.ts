import { GraphQLNonNull, GraphQLList, ThunkObjMap, GraphQLFieldConfig } from 'graphql';
import { MemberType, MemberTypeId } from '../types/member-type.js';
import { DataLoadersContainer } from '../loader.js';

export const MemberTypeQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  memberTypes: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),

    resolve: async (_, _args, { prisma, loaders }, info) => {
      const memberTypes = await prisma.memberType.findMany();
      const loader = loaders.getMemberTypeLoader(info);
      memberTypes.forEach((type) => loader.prime(type.id, type));
      return memberTypes;
    },
  },
  memberType: {
    type: MemberType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeId) },
    },
    resolve: async (
      _,
      { id }: { id: string },
      { loaders }: { loaders: DataLoadersContainer },
      info,
    ) => {
      return await loaders.getMemberTypeLoader(info).load(id);
    },
  },
};
