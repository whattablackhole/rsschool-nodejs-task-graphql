import { GraphQLNonNull, GraphQLList, GraphQLFieldConfig, ThunkObjMap } from 'graphql';
import { Profile } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';
import { httpErrors } from '@fastify/sensible';

export const ProfileQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  profiles: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),

    resolve: async (_, _args, { prisma }) => {
      return await prisma.post.findMany();
    },
  },
  profile: {
    type: Profile,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }, { prisma }) => {
      const profile = await prisma.profile.findUnique({
        where: {
          id,
        },
      });
      if (profile === null) {
        throw httpErrors.notFound();
      }
      return profile;
    },
  },
};
