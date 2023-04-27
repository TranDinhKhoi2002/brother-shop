import { sendGetRequest } from './baseRequest';

export const getReadyToSellEvent = async () => {
  const { events } = await sendGetRequest('/events/ready-to-sell');
  return events;
};

export const getEventByTag = async (eventTag) => {
  const { event } = await sendGetRequest(`/events/${eventTag}`);
  return event;
};
