import { MikroORM } from '@mikro-orm/core';
import { Post } from './entities/Post';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);
    const fork = orm.em.fork();
    await orm.getMigrator().up();

    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();

    const post = fork.create(Post, { title: 'The first Post' });
    await fork.persistAndFlush(post); 

    const posts = await fork.find(Post, {}); 
    console.log(posts)
    // await orm.em.nativeInsert(Post, { title: 'The second Post' });
}

main().catch(error => console.log(error));