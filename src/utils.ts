export function uniqueId (prefix: string) {
  return prefix + Math.random().toString(36).substr(2);
};
