import { getPostRepository } from "../repositories/PostRepository";
import { getUserRepository } from "../repositories/UserRepository";

type PostUpdateInput = {
  title?: string;
  content?: string;
};

export class PostService {
  async createPost(userId: number, title: string, content: string) {
    const user = await getUserRepository().findOneBy({ id: userId });

    if (!user) throw new Error("User not found");

    const post = getPostRepository().create({
      title,
      content,
      user,
    });

    return getPostRepository().save(post);
  }

  async getPosts() {
    return getPostRepository().find({ relations: ["user"] });
  }

  async getPost(id: number) {
    return getPostRepository().findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async updatePost(id: number, data: PostUpdateInput) {
    const post = await getPostRepository().findOneBy({ id });

    if (!post) throw new Error("Post not found");

    Object.assign(post, data);

    return getPostRepository().save(post);
  }

  async deletePost(id: number) {
    const post = await getPostRepository().findOneBy({ id });

    if (!post) throw new Error("Post not found");

    return getPostRepository().remove(post);
  }
}
