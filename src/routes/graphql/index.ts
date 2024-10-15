import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { execute, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { DataLoadersContainer } from './loader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const loaders = new DataLoadersContainer(prisma);
      const documentAST = parse(query);

      const validationErrors = validate(schema, documentAST, [depthLimit(5)]);

      if (validationErrors.length > 0) {
        return { errors: validationErrors };
      }

      return await execute({
        schema,
        document: documentAST,
        variableValues: variables,
        contextValue: { loaders, prisma },
      });
    },
  });
};

export default plugin;
