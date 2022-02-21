import Client from './client';
import { Group, GetMembersResults, isMemberResult, Subject } from './types';
import log from './log';

export const getMembers = async (
  client: Client,
  groupNames: string[],
  subjectAttributeNames: string[],
  filters?: any,
): Promise<{ group: Group | undefined; subjects: Subject[] | undefined }[]> => {
  try {
    const payload = {
      WsRestGetMembersRequest: {
        wsGroupLookups: groupNames.map(groupName => ({ groupName })),
        subjectAttributeNames,
        ...filters,
      },
    };
    log.debug('getMembers: Fetching subjects in group(s)', { groupNames, filters });
    const json: GetMembersResults = await client.post<GetMembersResults>('groups', payload);
    const results = json.WsGetMembersResults.results.map(r => ({
      group: r.wsGroup,
      subjects: r.wsSubjects,
    }));
    log.debug(
      'getMembers: Returning group/subjects pairs',
      results.map(r => ({ group: r.group, subjectCount: r.subjects?.length })),
    );
    return results;
  } catch (err) {
    log.error('getMembers: Error: ', err);
    throw err;
  }
};

export const isMember = async (client: Client, groupName: string, onid: string): Promise<Boolean> => {
  const json: isMemberResult = await client.get<isMemberResult>(`groups/${groupName}/members/${onid}`);
  return json.WsHasMemberLiteResult.resultMetadata.resultCode === 'IS_MEMBER';
};

export default {
  getMembers,
  isMember,
};
