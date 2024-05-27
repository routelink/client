import { format as Function } from 'date-fns';

export function formatDate(date: Date | undefined | string, format?: string): string {
  if (!date) return '';
  if (typeof date === 'string') date = new Date(date);

  return Function(date, format ?? 'dd.MM.yyyy HH:mm:ss');
}
