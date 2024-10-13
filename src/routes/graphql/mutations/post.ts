import { ThunkObjMap, GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { CreatePostInput, ChangePostInput } from '../types/inputs.js';
import { Post } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';

export const PostMutations: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  createPost: {
    type: new GraphQLNonNull(Post),
    args: {
      dto: { type: new GraphQLNonNull(CreatePostInput) },
    },
    resolve: async (_, args, context) => {
      const { prisma } = context;
      const { dto } = args;
      return await prisma.posts.create({
        data: dto,
      });
    },
  },
  changePost: {
    type: new GraphQLNonNull(Post),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInput) },
    },
    resolve: async (_, args, context) => {
      const { prisma } = context;
      const { dto, id } = args;
      return await prisma.posts.update({
        where: { id: id },
        data: dto,
      });
    },
  },

  deletePost: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args, context) => {
      const { prisma } = context;
      const { id } = args;
      await prisma.posts.delete({
        where: {
          id,
        },
      });
      return 'Ok';
    },
  },
};
