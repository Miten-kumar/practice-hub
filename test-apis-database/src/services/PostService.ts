import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";

export class PostService {
  async createPost(userId: number, title: string, content: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) throw new Error("User not found");

    const post = PostRepository.create({
      title,
      content,
      user,
    });

    return PostRepository.save(post);
  }

  async getPosts() {
    return PostRepository.find({ relations: ["user"] });
  }

  async getPost(id: number) {
    return PostRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }

  async updatePost(id: number, data: any) {
    const post = await PostRepository.findOneBy({ id });

    if (!post) throw new Error("Post not found");

    Object.assign(post, data);

    return PostRepository.save(post);
  }

  async deletePost(id: number) {
    const post = await PostRepository.findOneBy({ id });

    if (!post) throw new Error("Post not found");

    return PostRepository.remove(post);
  }
}
