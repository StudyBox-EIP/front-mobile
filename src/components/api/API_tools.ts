export function getBearerHeader(token: string) {
  return {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
}
