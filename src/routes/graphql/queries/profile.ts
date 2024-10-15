import { GraphQLNonNull, GraphQLList, GraphQLFieldConfig, ThunkObjMap } from 'graphql';
import { Profile } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';
import { DataLoadersContainer } from '../loader.js';

export const ProfileQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  profiles: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),

    resolve: async (_, _args, { prisma, loaders }, info) => {
      const profiles = await prisma.profile.findMany();
      const loader = loaders.getProfileLoader(info);
      profiles.forEach((profile) => loader.prime(profile.id, profile));
      return profiles;
    },
  },
  profile: {
    type: Profile,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _,
      { id }: { id: string },
      { loaders }: { loaders: DataLoadersContainer },
      info,
    ) => {
      return await loaders.getProfileLoader(info).load(id);
    },
  },
};
