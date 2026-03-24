export function successResponse(data: any, meta: any = {}, links: any = {}) {
  return {
    data,
    meta,
    links
  };
}