import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { fork }: MyContext): Promise<Post[]> {
    return fork.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("postId", () => Int) id: number,
    @Ctx() { fork }: MyContext
  ): Promise<Post | null> {
    return fork.findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { fork }: MyContext
  ): Promise<Post> {
    const post = fork.create(Post, { title });
    await fork.persistAndFlush(post);
    return post;
  }

  @Mutation(() => String)
  async deletePost(
    @Arg('postId', () => Int) id: number,
    @Ctx() { fork }: MyContext
  ): Promise<string> {
    await fork.nativeDelete(Post, { id });
    return 'Post succesfully deleted';
  }
}
