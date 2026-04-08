import { metadata } from "../core/metadata";

export function Required() {
  return function (target: any, key: string) {
    console.log(target.constructor,key);
    console.log(metadata);
    
    
    const rules = metadata.validators.get(target.constructor) || {};

    rules[key] = rules[key] || [];
    rules[key].push((value: any) =>
      value !== undefined && value !== null ? true : "is required"
    );

    metadata.validators.set(target.constructor, rules);
  };
}