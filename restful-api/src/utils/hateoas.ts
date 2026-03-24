export function userLinks(id: string) {
  return {
    self: `/api/v1/users/${id}`,
    update: `/api/v1/users/${id}`,
    delete: `/api/v1/users/${id}`
  };
}