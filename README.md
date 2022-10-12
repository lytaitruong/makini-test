# Test Makini

## Guide start

- Node: v18
- Pnpm: v7

1. Run `pnpm install` to download package
2. Run `pnpm run start:dev` for debug and implement features

## Swagger

- http://localhost:3333/documentation/v1

## Trick and Best practice

- The best way
  1. Sync data by pull period and log the last time in database or using webhook to push data to backend and insert to database
  2. The database should using Materialized-Tree
  - TypeORM: https://orkhan.gitbook.io/typeorm/docs/tree-entities#materialized-path-aka-path-enumeration
  - PrismaORM: https://www.prisma.io/docs/concepts/components/prisma-schema/relations/self-relations
- Combine table to generate new grid view and filter on it
- Another way
  - Should generate 1 column for formula IF|ELSE STATEMENT for filter query

## Communication

Authors: [lytaitruong060197@gmail.com]
