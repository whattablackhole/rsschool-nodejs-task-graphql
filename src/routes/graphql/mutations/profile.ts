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
    resolve: async () => {},
  },
  changeProfile: {
    type: new GraphQLNonNull(Profile),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInput) },
    },
    resolve: async () => {},
  },
  deleteProfile: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async () => {},
  },
};
