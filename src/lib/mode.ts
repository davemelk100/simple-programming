let advanced = typeof localStorage !== 'undefined' && localStorage.getItem('advanced') === 'true';
const listeners = new Set<(v: boolean) => void>();

export function getAdvanced(): boolean {
  return advanced;
}

export function setAdvanced(value: boolean) {
  advanced = value;
  if (typeof localStorage !== 'undefined') localStorage.setItem('advanced', String(advanced));
  listeners.forEach((fn) => fn(advanced));
}

export function toggleAdvanced(): boolean {
  advanced = !advanced;
  if (typeof localStorage !== 'undefined') localStorage.setItem('advanced', String(advanced));
  listeners.forEach((fn) => fn(advanced));
  return advanced;
}

export function onAdvancedChange(fn: (v: boolean) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
