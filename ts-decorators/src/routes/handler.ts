import { metadata } from "../core/metadata";
import { transform } from "../core/transformer";
import { validate } from "../core/validator";

export function handler(controller: any, methodName: string) {
  console.log(controller,methodName);
  
  const instance = new controller();

  return async (req: any, res: any) => {
    try {
      // 🛡️ Guards
      const guards = metadata.guards.get(controller.prototype)?.[methodName] || [];
      for (const guard of guards) {
        guard(req);
      }

      // 🎯 Params
      const paramMeta = metadata.params.get(controller.prototype)?.[methodName] || [];
      const args: any[] = [];

      for (const param of paramMeta) {
        if (param.type === "body") {
          const dtoClass =
            Reflect.getMetadata("design:paramtypes", controller.prototype, methodName)[param.index];

          const dto = transform(dtoClass, req.body);

          const errors = validate(dto);
          if (errors.length) {
            return res.status(400).json({ errors });
          }

          args[param.index] = dto;
        }
      }

      // 🎮 Call method
      const result = await instance[methodName](...args);

      res.json(result);
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  };
}