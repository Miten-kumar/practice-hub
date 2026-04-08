export function transform<T extends object>(cls: new () => T, plain: any): T {
  const instance = new cls();
  Object.assign(instance, plain);
  return instance;
}