import Client from "./client.ts";
import {
  Group,
  GetMembersResults,
  FindStemsResults,
  Stem,
  Subject
} from "./types.ts";
import log from "./log.ts";

const logger = log.getLogger();

export const getMembers = async (
  client: Client,
  groupNames: string[],
  subjectAttributeNames: string[],
  filters?: any
): Promise<{ group: Group | undefined; subjects: Subject[] | undefined }[]> => {
  try {
    const payload = {
      WsRestGetMembersRequest: {
        wsGroupLookups: groupNames.map(groupName => ({ groupName })),
        subjectAttributeNames,
        ...filters
      }
    };
    logger.debug(
      "getMembers: Fetching members from group(s)",
      groupNames,
      filters
    );
    const json: GetMembersResults = await client.post<GetMembersResults>(
      "groups",
      payload
    );
    const results = json.WsGetMembersResults.results.map(r => ({
      group: r.wsGroup,
      subjects: r.wsSubjects
    }));
    return results;
  } catch (err) {
    logger.error("getMembers: error: ", err);
    throw err;
  }
};

export const findStems = async (
  client: Client,
  stemName: string,
  approx?: boolean
): Promise<Stem[]> => {
  const payload = {
    WsRestFindStemsRequest: {
      wsStemQueryFilter: {
        stemQueryFilterType: `FIND_BY_STEM_NAME${approx ? "_APPROXIMATE" : ""}`,
        stemName
      }
    }
  };
  const json: FindStemsResults = await client.post<FindStemsResults>(
    "stems",
    payload
  );
  return json.WsFindStemsResults.stemResults;
};

export const findGroups = async (
  client: Client,
  groupName: string,
  stemName: string,
  approx?: boolean
) => {
  const payload = {
    WsRestFindGroupsRequest: {
      wsQueryFilter: {
        queryFilterType: `FIND_BY_GROUP_NAME${
          approx ? "_APPROXIMATE" : "_EXACT"
        }`,
        groupName,
        stemName
      }
    }
  };
  return client.post("groups", payload);
};

export default {
  getMembers,
  findStems,
  findGroups
};
