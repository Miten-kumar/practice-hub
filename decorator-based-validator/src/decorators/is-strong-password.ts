import { registerDecorator } from "class-validator";
import type { ValidationOptions } from "class-validator";

export function IsStrongPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (target: object, propertyName: string | symbol) => {
    registerDecorator({
      name: "isStrongPassword",
      target: target.constructor,
      propertyName: String(propertyName),
      options: validationOptions ?? {},
      validator: {
        validate(value: unknown) {
          return (
            typeof value === "string" &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
          );
        },
        defaultMessage: () =>
          "password must include uppercase, lowercase, and a number",
      },
    });
  };
}
