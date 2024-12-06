import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import { parse } from 'graphql-parse-resolve-info';

export class DataLoadersContainer {
  private userLoader: DataLoader<any, any, any> | null = null;
  private postLoader: DataLoader<any, any, any> | null = null;
  private profileLoader: DataLoader<any, any, any> | null = null;
  private memberTypeLoader: DataLoader<any, any, any> | null = null;
  private postByUserIDLoader: DataLoader<any, any, any> | null = null;
  private profileByUserIDLoader: DataLoader<any, any, any> | null = null;

  constructor(private prisma: PrismaClient) {}

  getUserLoader(info: GraphQLResolveInfo) {
    if (this.userLoader) {
      return this.userLoader;
    } else {
      const userLoader = new DataLoader(async (ids: readonly string[]) => {
        const parsedInfo = parse(info);
        const requestedFields = parsedInfo?.fieldsByTypeName.User;
        const fetchUserSubscribedTo = requestedFields?.['userSubscribedTo'];
        const fetchSubscribedToUser = requestedFields?.['subscribedToUser'];

        const users = await this.prisma.user.findMany({
          where: { id: { in: [...ids] } },
          include: {
            userSubscribedTo: !!fetchUserSubscribedTo,
            subscribedToUser: !!fetchSubscribedToUser,
          },
        });

        const groupedUsers = ids.map((id) => {
          return users.find((user) => user.id === id);
        });
        return groupedUsers;
      });
      this.userLoader = userLoader;
      return this.userLoader;
    }
  }
  getPostLoader(info: GraphQLResolveInfo) {
    if (this.postLoader) {
      return this.postLoader;
    } else {
      this.postLoader = new DataLoader(async (ids: readonly string[]) => {
        const posts = await this.prisma.post.findMany({
          where: { id: { in: [...ids] } },
        });
        const groupedPosts = ids.map((id) => {
          return posts.find((post) => post.id === id);
        });
        return groupedPosts;
      });
      return this.postLoader;
    }
  }
  getProfileLoader(info: GraphQLResolveInfo) {
    if (this.profileLoader) {
      return this.profileLoader;
    } else {
      this.profileLoader = new DataLoader(async (ids: readonly string[]) => {
        const profiles = await this.prisma.profile.findMany({
          where: { id: { in: [...ids] } },
        });
        const profileGrouped = ids.map((id) => {
          return profiles.find((profile) => profile.id === id);
        });
        return profileGrouped;
      });

      return this.profileLoader;
    }
  }

  getMemberTypeLoader(info: GraphQLResolveInfo) {
    if (this.memberTypeLoader) {
      return this.memberTypeLoader;
    } else {
      this.memberTypeLoader = new DataLoader(async (ids: readonly string[]) => {
        const memberTypes = await this.prisma.memberType.findMany({
          where: { id: { in: [...ids] } },
        });

        const groupedMemberTypes = ids.map((id) => {
          return memberTypes.find((type) => type.id === id);
        });

        return groupedMemberTypes;
      });
      return this.memberTypeLoader;
    }
  }
  getPostByUserIDLoader(info: GraphQLResolveInfo) {
    if (this.postByUserIDLoader) {
      return this.postByUserIDLoader;
    } else {
      this.postByUserIDLoader = new DataLoader(async (userIds: readonly string[]) => {
        const posts = await this.prisma.post.findMany({
          where: { authorId: { in: [...userIds] } },
        });

        const postsGroupedByUserId = userIds.map((userId) => {
          return posts.filter((post) => post.authorId === userId);
        });

        return postsGroupedByUserId;
      });
      return this.postByUserIDLoader;
    }
  }

  getProfileByUserIDLoader(info: GraphQLResolveInfo) {
    if (this.profileByUserIDLoader) {
      return this.profileByUserIDLoader;
    } else {
      this.profileByUserIDLoader = new DataLoader(async (userIds: readonly string[]) => {
        const profiles = await this.prisma.profile.findMany({
          where: { userId: { in: [...userIds] } },
        });

        const groupedProfiles = userIds.map((userId) => {
          return profiles.find((profile) => profile.userId === userId);
        });

        return groupedProfiles;
      });
      return this.profileByUserIDLoader;
    }
  }
}
