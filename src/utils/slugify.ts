import { randomBytes } from 'crypto';

export const slugify = (str: string, unique = false): string => {
  if (!str) return;

  let key = '';
  if (unique) key = '-' + randomBytes(3).toString('hex');
  return (
    str
      .toLowerCase()
      .trim()
      .split(' ')
      .join('-')
      .replace(/[.*+?^${}()|[\]\\]/g, '-')
      .replace(/--/g, '-') + key
  );
};
