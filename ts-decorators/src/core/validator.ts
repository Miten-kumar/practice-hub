import { metadata } from "./metadata";

export function validate(dto: any) {
  const errors: string[] = [];
  const rules = metadata.validators.get(dto.constructor) || {};

  for (const key in rules) {
    const value = dto[key];
    const validators = rules[key];

    for (const validator of validators) {
      const result = validator(value);
      if (result !== true) {
        errors.push(`${key}: ${result}`);
      }
    }
  }

  return errors;
}