import { GraphQLNonNull, GraphQLList, GraphQLFieldConfig, ThunkObjMap } from 'graphql';
import { Post } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';
import { DataLoadersContainer } from '../loader.js';

export const PostQueries: ThunkObjMap<GraphQLFieldConfig<any, any, any>> = {
  posts: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),

    resolve: async (_, _args, { prisma, loaders }, info) => {
      const posts = await prisma.post.findMany();
      const loader = loaders.getPostLoader(info);
      posts.forEach((post) => loader.prime(post.id, post));
      return posts;
    },
  },
  post: {
    type: Post,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      _,
      { id }: { id: string },
      { loaders }: { loaders: DataLoadersContainer },
      info,
    ) => {
      return await loaders.getPostLoader(info).load(id);
    },
  },
};
