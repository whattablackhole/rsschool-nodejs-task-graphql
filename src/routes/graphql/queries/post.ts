import { GraphQLNonNull, GraphQLList, GraphQLFieldConfig, ThunkObjMap } from 'graphql';
import { Post } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';

export const PostQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  posts: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),

    resolve: async (_, _args, { prisma }) => {
      return await prisma.post.findMany();
    },
  },
  post: {
    type: Post,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, args, { prisma }) => {
      const post = await prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });

      return post;
    },
  },
};
