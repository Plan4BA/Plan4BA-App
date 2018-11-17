export function getString(key: string): string {
  return localStorage.getItem(key);
}

export function setString(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function removeString(key: string) {
  localStorage.removeItem(key);
}
