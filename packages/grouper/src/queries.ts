import Client from './client';

export const getMembers = async (client: Client, stem: string) => {
  const endpoint = `groups/${stem}/members`;
  return client.get(endpoint);
};

export const findStems = async (client: Client, stem: string, approx?: boolean) => {
  const endpoint = 'stems';
  const payload = {
    WsRestFindStemsRequest: {
      wsStemQueryFilter: {
        stemQueryFilterType: `FIND_BY_STEM_NAME${approx ? '_APPROXIMATE' : ''}`,
        stemName: stem,
      },
    },
  };
  return client.post(endpoint, payload);
};

export default {
  getMembers,
};
