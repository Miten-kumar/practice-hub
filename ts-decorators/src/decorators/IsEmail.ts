import { metadata } from "../core/metadata";

export function IsEmail() {
  return function (target: any, key: string) {
    const rules = metadata.validators.get(target.constructor) || {};

    rules[key] = rules[key] || [];
    rules[key].push((value: any) =>
      /\S+@\S+\.\S+/.test(value) ? true : "must be email"
    );

    metadata.validators.set(target.constructor, rules);
  };
}