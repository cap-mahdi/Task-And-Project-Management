# Setting Up GraphQL Schema and Typings Generation

To organize your GraphQL schema and automatically generate typings for your project, follow these steps:

## 1. Add GraphQL Schema Files

In each entity folder of your project, add an `entity.graphql` file. In this file, specify the schema of the entity along with the queries , mutations , inputDtos and results related to that entity. For example:

```graphql
# entity.graphql

type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  getUser(id: ID!): User!
  listUsers: [User!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String, email: String): User!
  deleteUser(id: ID!): User!
}
input createUserInput {
  name: String!
  email: String!
}
type UpdateResult {
  affecetd: Int!
}
```

## 2. Generate Typings

After adding the `entity.graphql` files, run the following command in the apps/api folder to automatically generate the `graphql.ts` file that contains all the schemas, queries, and mutations of the entire project:

```bash
npm run generate:typings
```

For creating resolvers for an entity execute the command

```bash
nest g resolver entiy
```

For error handling use the `GraphQLError` class. Read more about in the appolo docs

Once the typings are generated, you can access the GraphQL Playground at localhost:3000/graphql to interact with your GraphQL API. Use this playground to test your queries and mutations, and explore the GraphQL schema.
