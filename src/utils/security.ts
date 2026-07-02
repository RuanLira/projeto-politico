const SUSPICIOUS_CHARS = /[<>{}$]/g;

export function sanitizeInput(value: string) {
  return value.trim().replace(SUSPICIOUS_CHARS, '');
}

export function normalizeHandle(value: string) {
  const clean = sanitizeInput(value).replace(/\s/g, '');
  return clean.startsWith('@') ? clean.toLowerCase() : `@${clean.toLowerCase()}`;
}

export function isStrongEnoughPassword(value: string) {
  return value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value);
}

export function canAccess(userRole: string, allowedRoles: string[]) {
  return allowedRoles.includes(userRole);
}
