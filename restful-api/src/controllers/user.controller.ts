import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { successResponse } from "../utils/apiResponse";
import { userLinks } from "../utils/hateoas";

const service = new UserService();

export class UserController {
  getAll(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { data, total } = service.getAll(page, limit);

    res.json(successResponse(data, {
      total,
      page,
      limit
    }));
  }

  getById(req: Request, res: Response) {
    const user = service.getById(req.params.id as string);

    res.json(successResponse(user, {}, userLinks(user.id)));
  }

  create(req: Request, res: Response) {
    const user = service.create(req.body);

    res.status(201).json(successResponse(user, {}, userLinks(user.id)));
  }

  update(req: Request, res: Response) {
    const user = service.update(req.params.id as string, req.body);

    res.json(successResponse(user, {}, userLinks(user.id)));
  }

  delete(req: Request, res: Response) {
    service.delete(req.params.id as string);

    res.status(204).send();
  }
}