import { metadata } from "../core/metadata";

export function Body() {
  return function (target: any, key: string, index: number) {
    const params = metadata.params.get(target) || {};

    params[key] = params[key] || [];
    params[key].push({
      index,
      type: "body"
    });

    metadata.params.set(target, params);
  };
}