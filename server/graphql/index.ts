import { decorateType } from 'nexus';
import { GraphQLDateTime } from 'graphql-scalars';

export const GQLDate = decorateType(GraphQLDateTime, {
  asNexusMethod: 'date',
});

export * from './AuthPayload';
export * from './Link';
export * from './User';
export * from './Vote';
