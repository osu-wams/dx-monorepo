import Client from './client';

export const getMembers = async (client: Client, stem: string) => {
  const endpoint = `groups/${stem}/members`;
  return client.get(endpoint);
};

export const findStems = async (client: Client, stemName: string, approx?: boolean) => {
  const payload = {
    WsRestFindStemsRequest: {
      wsStemQueryFilter: {
        stemQueryFilterType: `FIND_BY_STEM_NAME${approx ? '_APPROXIMATE' : ''}`,
        stemName,
      },
    },
  };
  return client.post('stems', payload);
};

export const findGroups = async (client: Client, groupName: string, stemName: string, approx?: boolean) => {
  const payload = {
    WsRestFindGroupsRequest: {
      wsQueryFilter: {
        queryFilterType: `FIND_BY_GROUP_NAME${approx ? '_APPROXIMATE' : '_EXACT'}`,
        groupName,
        stemName,
      },
    },
  };
  return client.post('groups', payload);
};

export default {
  getMembers,
  findStems,
  findGroups,
};
