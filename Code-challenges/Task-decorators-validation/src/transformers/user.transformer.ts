export function plainToClass<T extends Object>(
  cls: new () => T,
  data: any
): T {
  const obj = new cls();
  Object.assign(obj, data);

  return obj;
}