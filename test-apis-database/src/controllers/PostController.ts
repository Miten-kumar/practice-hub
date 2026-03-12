import { Request, Response } from "express";
import { PostService } from "../services/PostService";

const service = new PostService();

export class PostController {
  async create(req: Request, res: Response) {
    const { title, content } = req.body;
    const userId = Number(req.headers["user-id"]);

    const post = await service.createPost(userId, title, content);

    res.json(post);
  }

  async getAll(req: Request, res: Response) {
    const posts = await service.getPosts();

    res.json(posts);
  }

  async getOne(req: Request, res: Response) {
    const post = await service.getPost(Number(req.params.id));

    res.json(post);
  }

  async update(req: Request, res: Response) {
    const post = await service.updatePost(Number(req.params.id), req.body);

    res.json(post);
  }

  async delete(req: Request, res: Response) {
    await service.deletePost(Number(req.params.id));

    res.json({ message: "Deleted" });
  }
}
