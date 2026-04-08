import { metadata } from "../core/metadata";

export function IsString() {
  return function (target: any, key: string) {
    const rules = metadata.validators.get(target.constructor) || {};

    rules[key] = rules[key] || [];
    rules[key].push((value: any) =>
      typeof value === "string" ? true : "must be string"
    );

    metadata.validators.set(target.constructor, rules);
  };
}