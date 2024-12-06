import { ThunkObjMap, GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { CreateProfileInput, ChangeProfileInput } from '../types/inputs.js';
import { Profile } from '../types/profile.js';
import { UUIDType } from '../types/uuid.js';

export const ProfileMutations: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  createProfile: {
    type: new GraphQLNonNull(Profile),
    args: {
      dto: { type: new GraphQLNonNull(CreateProfileInput) },
    },
    resolve: async (_, args, context) => {
      const { prisma } = context;
      const { dto } = args;
      return await prisma.profile.create({
        data: dto,
      });
    },
  },
  changeProfile: {
    type: new GraphQLNonNull(Profile),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInput) },
    },
    resolve: async (_, args, context) => {
      const { prisma } = context;
      const { dto, id } = args;
      return await prisma.profile.update({
        where: { id: id },
        data: dto,
      });
    },
  },
  deleteProfile: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args, context) => {
      const { prisma } = context;
      const { id } = args;
      await prisma.profile.delete({
        where: {
          id,
        },
      });
      return 'Ok';
    },
  },
};
