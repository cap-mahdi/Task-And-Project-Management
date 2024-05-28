import moment from 'moment';
import { DateTime } from 'luxon';

export const dateToAgo = (date: Date) => {
  return moment(
    DateTime.fromJSDate(new Date(date)).toFormat('yyyyMMddhhmmss'),
    'YYYYMMDDHHmmss'
  ).fromNow();
};
