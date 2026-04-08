import { metadata } from "../core/metadata";

export function AuthGuard() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const guards = metadata.guards.get(target) || {};

    guards[key] = [
      (req: any) => {
        if (!req.headers.authorization) {
          throw new Error("Unauthorized");
        }
      }
    ];

    metadata.guards.set(target, guards);
  };
}