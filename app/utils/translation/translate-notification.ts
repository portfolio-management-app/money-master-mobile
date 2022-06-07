import { formatCurrency } from './../number';
import { APP_CONTENT } from 'shared/constants';

const CONTENT = APP_CONTENT.notificationContent;
export function translateNotificationMessage(payload: any) {
  const temp = { ...payload };
  let amount = payload['high'];
  if (payload['type'] === 'assetReachValueLow') {
    amount = payload['low'];
  }
  temp['title'] = CONTENT.title;
  temp['body'] = `${payload['assetName']} ${CONTENT.reach} ${formatCurrency(
    amount * 1,
    temp['currency']
  )} ${CONTENT.body}`;

  return temp;
}
