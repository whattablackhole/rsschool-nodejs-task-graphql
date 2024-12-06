import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { Profile } from './profile.js';
import { Post } from './post.js';
import { PrismaClient } from '@prisma/client';
import { DataLoadersContainer } from '../loader.js';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: Profile,
      resolve: async (
        parent,
        _args,
        { loaders, prisma }: { prisma: PrismaClient; loaders: DataLoadersContainer },
        info,
      ) => {
        return await loaders.getProfileByUserIDLoader(info).load(parent.id);
      
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (
        parent,
        _args,
        { loaders, prisma }: { prisma: PrismaClient; loaders: DataLoadersContainer },
        info,
      ) => {
        return await loaders.getPostByUserIDLoader(info).load(parent.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (
        parent,
        _args,

        { loaders, prisma }: { prisma: PrismaClient; loaders: DataLoadersContainer },
        info,
      ) => {
        const subscriptions = parent.userSubscribedTo || [];
        const loader = loaders.getUserLoader(info);
        return subscriptions.map((sub) => loader.load(sub.authorId));
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (
        parent,
        _args,
        { loaders, prisma }: { prisma: PrismaClient; loaders: DataLoadersContainer },
        info,
      ) => {
        const subscriptions = parent.subscribedToUser || [];
        const loader = loaders.getUserLoader(info);
        return subscriptions.map((sub) => loader.load(sub.subscriberId));
      },
    },
  }),
});
