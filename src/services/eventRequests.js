import request from './baseRequest';

export const getReadyToSellEvent = async () => {
  const res = await request.get('/events/ready-to-sell');
  return res.data.events;
};

export const getEventByTag = async (eventTag) => {
  const res = await request.get(`/events/${eventTag}`);
  return res.data.event;
};
