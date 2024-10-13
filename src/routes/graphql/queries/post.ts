import { GraphQLNonNull, GraphQLList, GraphQLFieldConfig, ThunkObjMap } from 'graphql';
import { Post } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';
import { httpErrors } from '@fastify/sensible';

export const PostQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  posts: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),

    resolve: async () => {
      return '';
    },
  },
  post: {
    type: Post,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_, { id }, { prisma }) => {
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });
      if (post === null) {
        throw httpErrors.notFound();
      }
      return post;
    },
  },
};
