import strict from "node:assert/strict";
import { emitKeypressEvents } from "node:readline";
import "reflect-metadata";
import { plainToClass } from "../transformers/user.transformer";
import { validate } from "../validators/userData.validator";


export function IsString() {
  return function (target: any, key: string) {
    const existingRules = Reflect.getMetadata("validation", target) || {};

    existingRules[key] = existingRules[key] || [];

    existingRules[key].push({
      type: "string",
    });

    Reflect.defineMetadata("validation", existingRules, target);
  };
}

export function IsEmail() {
  return function (target: any, key: string) {
    const existingRules = Reflect.getMetadata("validation", target) || {};

    existingRules[key] = existingRules[key] || [];

    existingRules[key].push({
      type: "email",
    });

    Reflect.defineMetadata("validation", existingRules, target);
  };
}

export function IsInt() {
  return function (target: any, key: string) {
    const existingRules = Reflect.getMetadata("validation", target) || {};

    existingRules[key] = existingRules[key] || [];

    existingRules[key].push({
      type: "number",
    });

    Reflect.defineMetadata("validation", existingRules, target);
  };
}


export function ValidateBody(dtoClass: any) {
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const req = args[0];
      const res = args[1];

      const dto = plainToClass(dtoClass, req.body);

      const errors = validate(dto);

      if (errors.length > 0) {
        return res.status(400).json({
          errors,
        });
      }

      return original.apply(this, args);
    };
  };
}


