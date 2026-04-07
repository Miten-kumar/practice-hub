import "reflect-metadata";


export function validate(obj: any): string[] {
  const errors: string[] = [];

  const rules =
    Reflect.getMetadata(
      "validation",
      Object.getPrototypeOf(obj)
    ) || {};

  for (const key in rules) {
    const value = obj[key];
    const validators = rules[key];

    for (const rule of validators) {
      if (rule.type === "string") {
        if (typeof value !== "string") {
          errors.push(`${key} must be string`);
        }
      }

      if (rule.type === "number") {
        if (typeof value !== "number") {
          errors.push(`${key} must be number`);
        }
      }

      if (rule.type === "email") {
        if (
          typeof value !== "string" ||
          !value.includes("@")
        ) {
          errors.push(`${key} must be valid email`);
        }
      }

    }
  }

  return errors;
}