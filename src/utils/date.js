import { format } from 'date-fns';

export function formatDate(date, pattern = 'yyyy-MM-dd HH:mm:ss') {
  return format(new Date(date), pattern);
}
