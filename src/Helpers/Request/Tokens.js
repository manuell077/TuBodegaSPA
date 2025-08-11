function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export function isTokenValid(token) {
  if (!token) return false;

  const payload = parseJwt(token);
  const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos

  return payload.exp && payload.exp > now;
}