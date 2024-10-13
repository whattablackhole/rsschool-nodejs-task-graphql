import { GraphQLNonNull, GraphQLList, ThunkObjMap, GraphQLFieldConfig } from 'graphql';
import { MemberType, MemberTypeId } from '../types/member-type.js';
import { httpErrors } from '@fastify/sensible';

export const MemberTypeQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  memberTypes: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),

    resolve: async (_, _args, context) => {
      return context.prisma.memberType.findMany();
    },
  },
  memberType: {
    type: MemberType,
    args: {
      id: { type: new GraphQLNonNull(MemberTypeId) },
    },
    resolve: async (_, args, context) => {
      const memberType = await context.prisma.memberType.findUnique({
        where: {
          id: args.id,
        },
      });
      if (memberType === null) {
        throw httpErrors.notFound();
      }
      return memberType;
    },
  },
};
