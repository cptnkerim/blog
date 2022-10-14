import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { Post } from './entities/Post';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
  },
  entities: [Post],
  dbName: "lireddit",
  user: "postgres",
  password: "postgres",
  type: "postgresql",
  debug: process.env.NODE_ENV !== "production",
} as Parameters<typeof MikroORM.init>[0];